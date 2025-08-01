import type { TagKey, Tag } from '@src/types/common';

// Tag labels and mappings
export const TAG_LABELS: Record<TagKey, string> = {
  all: '전체',
  trending_day: '인기',
  new: '신작',
  action: '액션',
  comedy: '코미디',
  drama: '드라마',
  horror: '공포',
  scifi: 'SF',
  animation: '애니메이션',
  documentary: '다큐멘터리',
  romance: '로맨스',
} as const;

export const TAGS: Tag[] = Object.entries(TAG_LABELS).map(([key, label]) => ({
  key: key as TagKey,
  label,
}));

// Genre IDs for TMDB API
export const GENRE_IDS = {
  action: [28] as number[], // Action
  comedy: [35] as number[], // Comedy  
  drama: [18] as number[], // Drama
  horror: [27] as number[], // Horror
  scifi: [878, 10765] as number[], // Sci-Fi + Sci-Fi & Fantasy (TV)
  animation: [16] as number[], // Animation
  documentary: [99] as number[], // Documentary
  romance: [10749] as number[], // Romance
};

// API defaults
export const API_DEFAULTS = {
  COUNT: 20,
  SINGLE_TAG_COUNT: 26,
  RECENT_MONTHS: 3,
} as const;

// Image base URLs
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const POSTER_SIZES = {
  SMALL: 'w185',
  MEDIUM: 'w342',
  LARGE: 'w500',
  XLARGE: 'w780',
  BACKDROP: 'w1280',
  ORIGINAL: 'original',
} as const;

// Image URL utility functions
export const getImageUrl = (path: string | null | undefined, size: keyof typeof POSTER_SIZES = 'LARGE'): string | null => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${POSTER_SIZES[size]}${path}`;
};

export const getPosterUrl = (posterPath: string | null | undefined): string | null => {
  return getImageUrl(posterPath, 'LARGE');
};

export const getBackdropUrl = (backdropPath: string | null | undefined): string | null => {
  return getImageUrl(backdropPath, 'BACKDROP');
};

export const getProfileUrl = (profilePath: string | null | undefined): string | null => {
  return getImageUrl(profilePath, 'SMALL');
};

// OTT service search URLs
export const OTT_SEARCH_URLS: Record<string, string> = {
  'Netflix': 'https://www.netflix.com/search?q=',
  'Disney Plus': 'https://www.disneyplus.com/search/',
  'Amazon Prime Video': 'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=',
  'Apple TV Plus': 'https://tv.apple.com/search?term=',
  'Hulu': 'https://www.hulu.com/search?q=',
  'Paramount Plus': 'https://www.paramountplus.com/search/',
  'HBO Max': 'https://www.max.com/search?q=',
  'Peacock': 'https://www.peacocktv.com/search?q=',
  'Crunchyroll': 'https://www.crunchyroll.com/search?q=',
  'Funimation': 'https://www.funimation.com/search/',
} as const;

// Image error handling utility
export const createImageErrorHandler = (posterPath: string | undefined) => {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (!posterPath) return;
    
    // Try smaller size first, then remove image if still fails
    if (target.src.includes('w500')) {
      target.src = `${IMAGE_BASE_URL}${POSTER_SIZES.MEDIUM}${posterPath}`;
    } else if (target.src.includes('w342')) {
      target.src = `${IMAGE_BASE_URL}${POSTER_SIZES.SMALL}${posterPath}`;
    } else {
      // If all sizes fail, hide image and show fallback
      target.style.display = 'none';
      const parent = target.parentElement;
      if (parent) {
        const fallback = parent.querySelector('.no-image') || 
                        document.createElement('div');
        fallback.className = 'no-image show';
        fallback.textContent = 'No Image';
        if (!parent.querySelector('.no-image')) {
          parent.appendChild(fallback);
        }
      }
    }
  };
};