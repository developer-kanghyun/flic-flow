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