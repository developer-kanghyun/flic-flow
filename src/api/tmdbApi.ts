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

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

import Movie from '../types/Movie';

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

interface Genre {
  id: number;
  name: string;
}

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

interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export const getWatchProviders = async (): Promise<WatchProvider[]> => {
  try {
    const response = await tmdbApi.get<{ results: WatchProvider[] }>('/watch/providers/movie');
    return response.data.results; // results 전체를 반환
  } catch (error) {
    console.error('Error fetching watch providers:', error);
    throw error;
  }
};

export const getMovieDetail = async (movieId: number): Promise<Movie> => {
  try {
    const response = await tmdbApi.get<Movie>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie detail for ID ${movieId}:`, error);
    throw error;
  }
};

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export const getMovieVideos = async (movieId: number): Promise<Video[]> => {
  try {
    const response = await tmdbApi.get<{ results: Video[] }>(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    throw error;
  }
};

interface WatchProviderDetails {
  link: string;
  flatrate?: Array<{ provider_id: number; provider_name: string; logo_path: string; display_priority: number; }>;
  rent?: Array<{ provider_id: number; provider_name: string; logo_path: string; display_priority: number; }>;
  buy?: Array<{ provider_id: number; provider_name: string; logo_path: string; display_priority: number; }>;
}

export const getMovieWatchProviders = async (movieId: number): Promise<WatchProviderDetails | null> => {
  try {
    const response = await tmdbApi.get<{ results: { KR?: WatchProviderDetails } }>(`/movie/${movieId}/watch/providers`, {
      params: {
        watch_region: 'KR',
      },
    });
    return response.data.results.KR || null; // 한국 지역 정보가 없으면 null 반환
  } catch (error) {
    console.error(`Error fetching movie watch providers for ID ${movieId}:`, error);
    throw error;
  }
};

interface DiscoverMoviesParams {
  ottIds?: number[];
  genreIds?: number[];
  keywordIds?: number[];
  sortBy?: string;
  count?: number;
  mediaType?: "movie" | "tv";
}

// 트렌딩 영화/TV 가져오기 (오늘의 인기)
export const getTrendingContent = async (count?: number): Promise<Movie[]> => {
  try {
    const [movieResponse, tvResponse] = await Promise.all([
      tmdbApi.get<{ results: Movie[] }>('/trending/movie/day'),
      tmdbApi.get<{ results: Movie[] }>('/trending/tv/day'),
    ]);
    const results: Movie[] = [...movieResponse.data.results, ...tvResponse.data.results];
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
    // 모든 경우에 discover API 사용하여 안정성 확보
    const today = new Date().toISOString().split('T')[0];
    const params: Record<string, string | number> = {
      'primary_release_date.gte': '2010-01-01',
      'primary_release_date.lte': today,
      'first_air_date.gte': '2010-01-01',
      'first_air_date.lte': today
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
    
    // 인기순으로 재정렬 (영화와 TV가 섞여있을 때)
    if (!mediaType && sortBy === 'popularity.desc') {
      results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    }
    
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error discovering movies/tv shows:', error);
    throw error;
  }
};

export default tmdbApi;

