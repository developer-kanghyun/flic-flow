import axios from 'axios';

const API_KEY = '3ae6b5388fdf89ad467b03611db40b01';
const BASE_URL = 'https://api.themoviedb.org/3';

export const OTT_SEARCH_URLS: { [key: string]: string } = {
  Netflix: "https://www.netflix.com/search?q=",
  Watcha: "https://watcha.com/search?query=",
  "Disney Plus": "https://www.disneyplus.com/search?q=",
  wavve: "https://www.wavve.com/search?searchWord=",
  "Coupang Play": "https://www.coupangplay.com/search?keyword=",
  TVING: "https://www.tving.com/search/all?keyword=",
  "Apple TV+": "https://tv.apple.com/search?term=",
};

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

import Movie from '../types/Movie';
import type { Genre, WatchProvider, WatchProviderDetails, DiscoverMoviesParams } from '@src/types/api';

export const searchMovies = async (query: string, count?: number): Promise<Movie[]> => {
  try {
    const [movieResponse, tvResponse] = await Promise.all([
      tmdbApi.get<{ results: Movie[] }>('/search/movie', { params: { query: query } }),
      tmdbApi.get<{ results: Movie[] }>('/search/tv', { params: { query: query } }),
    ]);
    const results: Movie[] = [...movieResponse.data.results, ...tvResponse.data.results];
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error searching movies/tv shows:', error);
    throw error;
  }
};

// 배우 이름으로 영화/TV 검색
export const searchByActor = async (actorName: string, count?: number): Promise<Movie[]> => {
  try {
    console.log('Searching for actor:', actorName);
    
    // 먼저 배우를 검색
    const personResponse = await tmdbApi.get<{ results: { id: number; name: string }[] }>('/search/person', {
      params: { query: actorName }
    });
    
    console.log('Person search results:', personResponse.data.results);
    
    if (personResponse.data.results.length === 0) {
      console.log('No person found for:', actorName);
      return [];
    }
    
    const personId = personResponse.data.results[0].id;
    console.log('Found person ID:', personId);
    
    // 해당 배우의 출연작품 검색
    const creditsResponse = await tmdbApi.get<{
      cast: Array<Movie & { media_type: 'movie' | 'tv' }>
    }>(`/person/${personId}/combined_credits`);
    
    console.log('Credits response cast length:', creditsResponse.data.cast?.length || 0);
    console.log('Sample cast items:', creditsResponse.data.cast?.slice(0, 5).map(item => ({ title: item.title, name: item.name, id: item.id })));
    
    const results = creditsResponse.data.cast.map(item => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
    
    // 인기도 순으로 정렬
    results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    
    console.log('Final results count:', results.length);
    console.log('Top 5 results:', results.slice(0, 5).map(item => ({ title: item.title, name: item.name, popularity: item.popularity })));
    
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error searching by actor:', error);
    // 배우 검색 실패시 일반 검색으로 폴백
    return searchMovies(actorName, count);
  }
};

// 향상된 한글 검색 - 다중 검색 전략
export const enhancedSearch = async (query: string, count?: number): Promise<Movie[]> => {
  try {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return [];

    // 먼저 기본 영화/TV 검색 시도
    const basicResults = await searchMovies(trimmedQuery);
    
    // 기본 검색에서 충분한 결과가 나오면 배우 검색도 추가로 시도
    let actorResults: Movie[] = [];
    try {
      actorResults = await searchByActor(trimmedQuery, 20);
    } catch (error) {
      console.log('Actor search failed, continuing with basic results');
    }

    // 결과 합치기 및 중복 제거
    const allResults: Movie[] = [];
    const seenIds = new Set<number>();

    // 기본 검색 결과 먼저 추가 (더 정확함)
    basicResults.forEach((movie: Movie) => {
      if (!seenIds.has(movie.id)) {
        seenIds.add(movie.id);
        allResults.push(movie);
      }
    });

    // 배우 검색 결과 추가 (중복 제거)
    actorResults.forEach((movie: Movie) => {
      if (!seenIds.has(movie.id)) {
        seenIds.add(movie.id);
        allResults.push(movie);
      }
    });

    // 관련성 점수 계산
    const queryLower = trimmedQuery.toLowerCase();
    allResults.forEach(movie => {
      const title = (movie.title || movie.name || '').toLowerCase();
      const overview = (movie.overview || '').toLowerCase();
      
      let relevanceScore = movie.popularity || 0;
      
      // 제목에 검색어 포함시 높은 가산점
      if (title.includes(queryLower)) {
        relevanceScore += 2000;
      }
      // 줄거리에 검색어 포함시 중간 가산점
      if (overview.includes(queryLower)) {
        relevanceScore += 500;
      }
      
      (movie as any).relevanceScore = relevanceScore;
    });

    // 관련성 점수 기준으로 정렬
    allResults.sort((a, b) => ((b as any).relevanceScore || 0) - ((a as any).relevanceScore || 0));

    return count ? allResults.slice(0, count) : allResults;
  } catch (error) {
    console.error('Error in enhanced search:', error);
    // 폴백: 기본 검색만 사용
    return searchMovies(query, count);
  }
};

// OTT 서비스에서 시청 가능한 콘텐츠만 필터링
export const filterByOTTAvailability = async (movies: Movie[]): Promise<Movie[]> => {
  try {
    const availableMovies: Movie[] = [];
    
    // 병렬로 시청 제공업체 확인 (최대 20개씩 처리)
    const chunks = [];
    for (let i = 0; i < movies.length; i += 20) {
      chunks.push(movies.slice(i, i + 20));
    }
    
    for (const chunk of chunks) {
      const promises = chunk.map(async (movie) => {
        try {
          const watchProviders = await getContentWatchProviders(movie.id, movie.media_type);
          if (watchProviders && watchProviders.flatrate && watchProviders.flatrate.length > 0) {
            return movie;
          }
          return null;
        } catch (error) {
          console.log(`Watch provider check failed for movie ${movie.id}:`, error);
          return null;
        }
      });
      
      const results = await Promise.all(promises);
      results.forEach(movie => {
        if (movie) {
          availableMovies.push(movie);
        }
      });
    }
    
    return availableMovies;
  } catch (error) {
    console.error('Error filtering by OTT availability:', error);
    // 에러 발생시 원본 결과 반환
    return movies;
  }
};

// OTT 필터링이 적용된 배우 검색
export const searchByActorWithOTT = async (actorName: string, count?: number): Promise<Movie[]> => {
  try {
    const allResults = await searchByActor(actorName);
    const ottFilteredResults = await filterByOTTAvailability(allResults);
    return count ? ottFilteredResults.slice(0, count) : ottFilteredResults;
  } catch (error) {
    console.error('Error in OTT-filtered actor search:', error);
    return searchByActor(actorName, count);
  }
};

// OTT 필터링이 적용된 일반 검색
export const searchMoviesWithOTT = async (query: string, count?: number): Promise<Movie[]> => {
  try {
    const allResults = await searchMovies(query);
    const ottFilteredResults = await filterByOTTAvailability(allResults);
    return count ? ottFilteredResults.slice(0, count) : ottFilteredResults;
  } catch (error) {
    console.error('Error in OTT-filtered search:', error);
    return searchMovies(query, count);
  }
};

export const getMovieGenres = async (): Promise<Genre[]> => {
  try {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    throw error;
  }
};

export const getTvGenres = async (): Promise<Genre[]> => {
  try {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/tv/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    throw error;
  }
};

export const getWatchProviders = async (): Promise<WatchProvider[]> => {
  try {
    const response = await tmdbApi.get<{ results: WatchProvider[] }>('/watch/providers/movie');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching watch providers:', error);
    throw error;
  }
};

export const getMovieDetail = async (movieId: number): Promise<Movie> => {
  try {
    const response = await tmdbApi.get<Movie>(`/movie/${movieId}`);
    return { ...response.data, media_type: 'movie' };
  } catch (error) {
    console.error(`Error fetching movie detail for ID ${movieId}:`, error);
    throw error;
  }
};

export const getTvDetail = async (tvId: number): Promise<Movie> => {
  try {
    const response = await tmdbApi.get<Movie>(`/tv/${tvId}`);
    return { ...response.data, media_type: 'tv' };
  } catch (error) {
    console.error(`Error fetching TV detail for ID ${tvId}:`, error);
    throw error;
  }
};

// 크레딧 정보 (감독, 출연진) 가져오기
export const getMovieCredits = async (movieId: number): Promise<import('@src/types/api').Credits> => {
  try {
    const response = await tmdbApi.get<import('@src/types/api').Credits>(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    throw error;
  }
};

export const getTvCredits = async (tvId: number): Promise<import('@src/types/api').Credits> => {
  try {
    const response = await tmdbApi.get<import('@src/types/api').Credits>(`/tv/${tvId}/credits`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching TV credits for ID ${tvId}:`, error);
    throw error;
  }
};

export const getContentCredits = async (contentId: number, mediaType?: 'movie' | 'tv'): Promise<import('@src/types/api').Credits> => {
  if (mediaType === 'tv') {
    return getTvCredits(contentId);
  } else if (mediaType === 'movie') {
    return getMovieCredits(contentId);
  }
  
  // media_type이 없는 경우 영화 API를 먼저 시도하고, 실패하면 TV API 시도
  try {
    return await getMovieCredits(contentId);
  } catch {
    try {
      return await getTvCredits(contentId);
    } catch (error) {
      console.error(`Error fetching content credits for ID ${contentId}:`, error);
      throw error;
    }
  }
};

// 관련 콘텐츠 추천
export const getMovieRecommendations = async (movieId: number): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<{ results: Movie[] }>(`/movie/${movieId}/recommendations`);
    return response.data.results.map(item => ({ ...item, media_type: 'movie' }));
  } catch (error) {
    console.error(`Error fetching movie recommendations for ID ${movieId}:`, error);
    throw error;
  }
};

export const getTvRecommendations = async (tvId: number): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<{ results: Movie[] }>(`/tv/${tvId}/recommendations`);
    return response.data.results.map(item => ({ ...item, media_type: 'tv' }));
  } catch (error) {
    console.error(`Error fetching TV recommendations for ID ${tvId}:`, error);
    throw error;
  }
};

export const getContentRecommendations = async (contentId: number, mediaType?: 'movie' | 'tv'): Promise<Movie[]> => {
  if (mediaType === 'tv') {
    return getTvRecommendations(contentId);
  } else if (mediaType === 'movie') {
    return getMovieRecommendations(contentId);
  }
  
  // media_type이 없는 경우 영화 API를 먼저 시도하고, 실패하면 TV API 시도
  try {
    return await getMovieRecommendations(contentId);
  } catch {
    try {
      return await getTvRecommendations(contentId);
    } catch (error) {
      console.error(`Error fetching content recommendations for ID ${contentId}:`, error);
      return []; // 추천이 없어도 에러를 던지지 않음
    }
  }
};

export const getContentDetail = async (contentId: number, mediaType?: 'movie' | 'tv'): Promise<Movie> => {
  if (mediaType === 'tv') {
    return getTvDetail(contentId);
  } else if (mediaType === 'movie') {
    return getMovieDetail(contentId);
  }
  
  // media_type이 없는 경우 영화 API를 먼저 시도하고, 실패하면 TV API 시도
  try {
    return await getMovieDetail(contentId);
  } catch {
    try {
      return await getTvDetail(contentId);
    } catch (error) {
      console.error(`Error fetching content detail for ID ${contentId}:`, error);
      throw error;
    }
  }
};

export const getMovieVideos = async (movieId: number): Promise<import('@src/types/api').Video[]> => {
  try {
    const response = await tmdbApi.get<{ results: import('@src/types/api').Video[] }>(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    throw error;
  }
};

export const getTvVideos = async (tvId: number): Promise<import('@src/types/api').Video[]> => {
  try {
    const response = await tmdbApi.get<{ results: import('@src/types/api').Video[] }>(`/tv/${tvId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching TV videos for ID ${tvId}:`, error);
    throw error;
  }
};

export const getContentVideos = async (contentId: number, mediaType?: 'movie' | 'tv'): Promise<import('@src/types/api').Video[]> => {
  if (mediaType === 'tv') {
    return getTvVideos(contentId);
  } else if (mediaType === 'movie') {
    return getMovieVideos(contentId);
  }
  
  // media_type이 없는 경우 영화 API를 먼저 시도하고, 실패하면 TV API 시도
  try {
    return await getMovieVideos(contentId);
  } catch {
    try {
      return await getTvVideos(contentId);
    } catch (error) {
      console.error(`Error fetching content videos for ID ${contentId}:`, error);
      throw error;
    }
  }
};

export const getMovieWatchProviders = async (movieId: number): Promise<WatchProviderDetails | null> => {
  try {
    const response = await tmdbApi.get<{ results: { KR?: WatchProviderDetails } }>(`/movie/${movieId}/watch/providers`, {
      params: {
        watch_region: 'KR',
      },
    });
    return response.data.results.KR || null;
  } catch (error) {
    console.error(`Error fetching movie watch providers for ID ${movieId}:`, error);
    throw error;
  }
};

export const getTvWatchProviders = async (tvId: number): Promise<WatchProviderDetails | null> => {
  try {
    const response = await tmdbApi.get<{ results: { KR?: WatchProviderDetails } }>(`/tv/${tvId}/watch/providers`, {
      params: {
        watch_region: 'KR',
      },
    });
    return response.data.results.KR || null;
  } catch (error) {
    console.error(`Error fetching TV watch providers for ID ${tvId}:`, error);
    throw error;
  }
};

export const getContentWatchProviders = async (contentId: number, mediaType?: 'movie' | 'tv'): Promise<WatchProviderDetails | null> => {
  if (mediaType === 'tv') {
    return getTvWatchProviders(contentId);
  } else if (mediaType === 'movie') {
    return getMovieWatchProviders(contentId);
  }
  
  // media_type이 없는 경우 영화 API를 먼저 시도하고, 실패하면 TV API 시도
  try {
    return await getMovieWatchProviders(contentId);
  } catch {
    try {
      return await getTvWatchProviders(contentId);
    } catch (error) {
      console.error(`Error fetching content watch providers for ID ${contentId}:`, error);
      throw error;
    }
  }
};

// 트렌딩 영화/TV 가져오기 (오늘의 인기)
export const getTrendingContent = async (count?: number, timeWindow: 'day' | 'week' = 'day'): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<{ results: Movie[] }>(`/trending/all/${timeWindow}`);
    const results = response.data.results.map(item => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error fetching trending content:', error);
    throw error;
  }
};

// 최근 신작 중 인기순으로 가져오기
export const getRecentTrendingContent = async (sinceDate: string, count?: number, ottIds?: number[]): Promise<Movie[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // 모든 경우에 discover API 사용하여 날짜 필터링 보장
    const params: Record<string, string | number> = {
      sort_by: 'popularity.desc',
      'primary_release_date.gte': sinceDate,
      'primary_release_date.lte': today,
      'first_air_date.gte': sinceDate,
      'first_air_date.lte': today
    };
    
    if (ottIds && ottIds.length > 0) {
      params.with_watch_providers = ottIds.join('|');
      params.watch_region = 'KR';
    }
    
    let moviePromise = Promise.resolve({ data: { results: [] as Movie[] } });
    let tvPromise = Promise.resolve({ data: { results: [] as Movie[] } });

    moviePromise = tmdbApi.get<{ results: Movie[] }>('/discover/movie', { params });
    tvPromise = tmdbApi.get<{ results: Movie[] }>('/discover/tv', { params });

    const [movieResponse, tvResponse] = await Promise.all([moviePromise, tvPromise]);
    const results: Movie[] = [...movieResponse.data.results, ...tvResponse.data.results];
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error fetching recent trending content:', error);
    // 폴백: 일반 신작 검색
    return discoverMovies({ 
      ottIds,
      sortBy: 'primary_release_date.desc', 
      count 
    });
  }
};

export const discoverMovies = async ({ ottIds, genreIds, keywordIds, sortBy, count, mediaType }: DiscoverMoviesParams): Promise<Movie[]> => {
  try {
    // 현재 날짜 기준으로 필터링 (미래 작품 제외)
    const today = new Date().toISOString().split('T')[0];
    const params: Record<string, string | number> = {
      'primary_release_date.gte': '2010-01-01',
      'primary_release_date.lte': today,
      'first_air_date.gte': '2010-01-01',
      'first_air_date.lte': today,
      'vote_count.gte': 10 // 최소 10명 이상 평가한 작품만
    };
    
    // 정렬 옵션 설정
    if (sortBy === "popular" || sortBy === "popularity.desc") {
      params.sort_by = 'popularity.desc';
    } else if (sortBy === "new" || sortBy === "primary_release_date.desc") {
      params.sort_by = 'primary_release_date.desc';
    } else if (sortBy) {
      params.sort_by = sortBy;
    } else {
      params.sort_by = 'popularity.desc'; // 기본값
    }
    
    if (ottIds && ottIds.length > 0) {
      params.with_watch_providers = ottIds.join('|');
      params.watch_region = 'KR';
    }
    
    if (genreIds && genreIds.length > 0) {
      params.with_genres = genreIds.join('|');
    }
    
    if (keywordIds && keywordIds.length > 0) {
      params.with_keywords = keywordIds.join('|');
    }
    
    let moviePromise = Promise.resolve({ data: { results: [] as Movie[] } });
    let tvPromise = Promise.resolve({ data: { results: [] as Movie[] } });

    if (mediaType === 'movie') {
      moviePromise = tmdbApi.get<{ results: Movie[] }>('/discover/movie', { params });
    } else if (mediaType === 'tv') {
      tvPromise = tmdbApi.get<{ results: Movie[] }>('/discover/tv', { params });
    } else {
      // 둘 다 가져오기
      moviePromise = tmdbApi.get<{ results: Movie[] }>('/discover/movie', { params });
      tvPromise = tmdbApi.get<{ results: Movie[] }>('/discover/tv', { params });
    }

    const [movieResponse, tvResponse] = await Promise.all([moviePromise, tvPromise]);
    const results: Movie[] = [...movieResponse.data.results, ...tvResponse.data.results];
    
    // 순수 인기도(시청률) 기준 정렬
    if (sortBy === 'popularity.desc') {
      results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error discovering movies/tv shows:', error);
    throw error;
  }
};

export default tmdbApi;

