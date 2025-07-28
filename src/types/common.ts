// 기본 타입들
export type MediaType = 'movie' | 'tv';

export type SortBy = 
  | 'popularity.desc' 
  | 'popularity.asc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'vote_average.desc'
  | 'vote_average.asc';

export type TagKey = 
  | 'all'
  | 'trending_day'
  | 'new'
  | 'action'
  | 'comedy'
  | 'drama'
  | 'horror'
  | 'scifi'
  | 'animation'
  | 'documentary'
  | 'romance';

export interface Tag {
  key: TagKey;
  label: string;
}

// 로딩 및 에러 상태를 위한 공통 타입들
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

// API 응답을 위한 제네릭 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 페이지네이션 관련 타입
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}