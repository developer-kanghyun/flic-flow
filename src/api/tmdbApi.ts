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

export const discoverMovies = async ({ ottIds, genreIds, keywordIds, sortBy, count, mediaType }: DiscoverMoviesParams): Promise<Movie[]> => {
  try {
    const params: Record<string, string | number> = {};
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
    if (sortBy) {
      if (sortBy === "popular") {
        params.sort_by = 'popularity.desc';
      } else if (sortBy === "new") {
        params.sort_by = 'primary_release_date.desc';
      }
    }

    let moviePromise = Promise.resolve({ data: { results: [] as Movie[] } });
    let tvPromise = Promise.resolve({ data: { results: [] as Movie[] } });

    if (mediaType === 'movie') {
      moviePromise = tmdbApi.get<{ results: Movie[] }>('/discover/movie', { params: params });
    } else if (mediaType === 'tv') {
      tvPromise = tmdbApi.get<{ results: Movie[] }>('/discover/tv', { params: params });
    } else {
      moviePromise = tmdbApi.get<{ results: Movie[] }>('/discover/movie', { params: params });
      tvPromise = tmdbApi.get<{ results: Movie[] }>('/discover/tv', { params: params });
    }

    const [movieResponse, tvResponse] = await Promise.all([moviePromise, tvPromise]);
    const results: Movie[] = [...movieResponse.data.results, ...tvResponse.data.results];
    return count ? results.slice(0, count) : results;
  } catch (error) {
    console.error('Error discovering movies/tv shows:', error);
    throw error;
  }
};

export default tmdbApi;

