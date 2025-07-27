export interface TMDBResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority?: number;
}

export interface WatchProviderDetails {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

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

export interface DiscoverMoviesParams {
  ottIds?: number[];
  genreIds?: number[];
  keywordIds?: number[];
  sortBy?: string;
  count?: number;
  mediaType?: "movie" | "tv";
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path?: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}