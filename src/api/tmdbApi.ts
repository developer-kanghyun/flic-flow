import axios from 'axios';
import { createApiErrorHandler, logError } from '@src/utils/apiErrorHandler';
import type { MediaType } from '@src/types/common';
import Movie from '@src/types/Movie';

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
}

interface PersonCredits {
  cast: Movie[];
  crew: Movie[];
}

// Environment variables validation
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  throw new Error('VITE_TMDB_API_KEY is required. Please check your .env file.');
}

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

import type { Genre, WatchProvider, WatchProviderDetails, DiscoverMoviesParams } from '@src/types/api';

export const searchMovies = async (query: string, count?: number): Promise<Movie[]> => {
  const handleError = createApiErrorHandler('searchMovies');
  
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [movieResponse, tvResponse, personResponse] = await Promise.all([
      tmdbApi.get<{ results: Movie[] }>('/search/movie', { params: { query: query } }),
      tmdbApi.get<{ results: Movie[] }>('/search/tv', { params: { query: query } }),
      tmdbApi.get<{ results: Person[] }>('/search/person', { params: { query: query } }),
    ]);
    
    // 미래 출시 콘텐츠 필터링 - 더 엄격한 필터링
    const filterFutureContent = (items: Movie[]) => items.filter(item => {
      const releaseDate = item.release_date || item.first_air_date;
      return releaseDate && releaseDate <= today;
    });
    
    let results: Movie[] = [
      ...filterFutureContent(movieResponse.data.results), 
      ...filterFutureContent(tvResponse.data.results)
    ];
    
    // 인물 검색 결과가 있으면 해당 인물의 출연작/연출작 추가
    if (personResponse.data.results.length > 0) {
      const personCreditsPromises = personResponse.data.results.slice(0, 3).map(async (person: Person) => {
        try {
          const creditsResponse = await tmdbApi.get<PersonCredits>(`/person/${person.id}/combined_credits`);
          return creditsResponse.data.cast.concat(creditsResponse.data.crew || []);
        } catch (error) {
          return [];
        }
      });
      
      const personCredits = await Promise.all(personCreditsPromises);
      const personMovies = personCredits.flat().filter((item: Movie) => {
        const isCorrectType = item.media_type === 'movie' || item.media_type === 'tv';
        const releaseDate = item.release_date || item.first_air_date;
        const isReleased = releaseDate && releaseDate <= today;
        return isCorrectType && isReleased;
      });
      
      results = [...results, ...personMovies];
    }
    
    // 중복 제거 (ID 기준)
    const uniqueResults = results.filter((item, index, self) => 
      index === self.findIndex(t => t.id === item.id && t.media_type === item.media_type)
    );
    
    return count ? uniqueResults.slice(0, count) : uniqueResults;
  } catch (error) {
    const apiError = handleError(error);
    logError(apiError);
    throw apiError;
  }
};

// 배우 이름으로 영화/TV 검색
export const searchByActor = async (actorName: string, count?: number): Promise<Movie[]> => {
  try {
    
    // 먼저 배우를 검색
    const personResponse = await tmdbApi.get<{ results: { id: number; name: string }[] }>('/search/person', {
      params: { query: actorName }
    });
    
    
    if (personResponse.data.results.length === 0) {
      return [];
    }
    
    const personId = personResponse.data.results[0].id;
    
    // 해당 배우의 출연작품 검색
    const creditsResponse = await tmdbApi.get<{
      cast: Array<Movie & { media_type: 'movie' | 'tv' }>
    }>(`/person/${personId}/combined_credits`);
    
    
    const results = creditsResponse.data.cast.map(item => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
    
    // 인기도 순으로 정렬
    results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    
    
    return count ? results.slice(0, count) : results;
  } catch (error) {
    // 배우 검색 실패시 일반 검색으로 폴백
    return searchMovies(actorName, count);
  }
};


export const getMovieGenres = async (): Promise<Genre[]> => {
  try {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    throw error;
  }
};

export const getTvGenres = async (): Promise<Genre[]> => {
  try {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/tv/list');
    return response.data.genres;
  } catch (error) {
    throw error;
  }
};

export const getWatchProviders = async (): Promise<WatchProvider[]> => {
  try {
    const response = await tmdbApi.get<{ results: WatchProvider[] }>('/watch/providers/movie');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

// 통합된 컨텐츠 상세 정보 조회 함수
export const getContentDetail = async (contentId: number, mediaType?: MediaType): Promise<Movie> => {
  const handleError = createApiErrorHandler('getContentDetail');
  
  const fetchDetail = async (type: 'movie' | 'tv'): Promise<Movie> => {
    try {
      const response = await tmdbApi.get<Movie>(`/${type}/${contentId}`);
      return { ...response.data, media_type: type };
    } catch (error) {
      const apiError = handleError(error);
      logError(apiError);
      throw apiError;
    }
  };
  
  if (mediaType === 'tv') {
    return fetchDetail('tv');
  } else if (mediaType === 'movie') {
    return fetchDetail('movie');
  }
  
  // media_type이 없는 경우 영화 API를 먼저 시도하고, 실패하면 TV API 시도
  try {
    return await fetchDetail('movie');
  } catch {
    try {
      return await fetchDetail('tv');
    } catch (error) {
      const apiError = createApiErrorHandler('getContentDetail fallback')(error);
      logError(apiError);
      throw apiError;
    }
  }
};

// 하위 호환성을 위한 deprecated 함수들
/** @deprecated Use getContentDetail instead */
export const getMovieDetail = (movieId: number): Promise<Movie> => 
  getContentDetail(movieId, 'movie');

/** @deprecated Use getContentDetail instead */
export const getTvDetail = (tvId: number): Promise<Movie> => 
  getContentDetail(tvId, 'tv');

// 크레딧 정보 (감독, 출연진) 가져오기
export const getMovieCredits = async (movieId: number): Promise<import('@src/types/api').Credits> => {
  try {
    const response = await tmdbApi.get<import('@src/types/api').Credits>(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTvCredits = async (tvId: number): Promise<import('@src/types/api').Credits> => {
  try {
    const response = await tmdbApi.get<import('@src/types/api').Credits>(`/tv/${tvId}/credits`);
    return response.data;
  } catch (error) {
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
      throw error;
    }
  }
};

// 관련 콘텐츠 추천
export const getMovieRecommendations = async (movieId: number): Promise<Movie[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await tmdbApi.get<{ results: Movie[] }>(`/movie/${movieId}/recommendations`);
    
    // 미래 출시 콘텐츠 필터링 - 더 엄격한 필터링
    const filteredResults = response.data.results.filter(item => {
      const releaseDate = item.release_date;
      return releaseDate && releaseDate <= today;
    });
    
    return filteredResults.map(item => ({ ...item, media_type: 'movie' }));
  } catch (error) {
    throw error;
  }
};

export const getTvRecommendations = async (tvId: number): Promise<Movie[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await tmdbApi.get<{ results: Movie[] }>(`/tv/${tvId}/recommendations`);
    
    // 미래 출시 콘텐츠 필터링 - 더 엄격한 필터링
    const filteredResults = response.data.results.filter(item => {
      const releaseDate = item.first_air_date;
      return releaseDate && releaseDate <= today;
    });
    
    return filteredResults.map(item => ({ ...item, media_type: 'tv' }));
  } catch (error) {
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
      return []; // 추천이 없어도 에러를 던지지 않음
    }
  }
};


export const getMovieVideos = async (movieId: number): Promise<import('@src/types/api').Video[]> => {
  try {
    const response = await tmdbApi.get<{ results: import('@src/types/api').Video[] }>(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const getTvVideos = async (tvId: number): Promise<import('@src/types/api').Video[]> => {
  try {
    const response = await tmdbApi.get<{ results: import('@src/types/api').Video[] }>(`/tv/${tvId}/videos`);
    return response.data.results;
  } catch (error) {
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
      throw error;
    }
  }
};

// 트렌딩 영화/TV 가져오기 (오늘의 인기)
export const getTrendingContent = async (count?: number, timeWindow: 'day' | 'week' = 'day'): Promise<Movie[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await tmdbApi.get<{ results: Movie[] }>(`/trending/all/${timeWindow}`);
    
    // 미래 출시 콘텐츠 필터링 - 더 엄격한 필터링
    const filteredResults = response.data.results.filter(item => {
      const releaseDate = item.release_date || item.first_air_date;
      return releaseDate && releaseDate <= today;
    });
    
    const results = filteredResults.map(item => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
    return count ? results.slice(0, count) : results;
  } catch (error) {
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
    throw error;
  }
};

export default tmdbApi;

