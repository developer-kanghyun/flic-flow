import { GENRE_IDS, TAG_LABELS, API_DEFAULTS } from './constants';
import { discoverMovies, getRecentTrendingContent, getTrendingContent } from '@src/api/tmdbApi';
import { getGenreBasedTrending } from '@src/api/genreBasedTrending';
import { getTruePopularContent } from '@src/api/truePopularityApi';
import Movie from '@src/types/Movie';
import type { MediaType, TagKey } from '@src/types/common';

export interface BaseParams {
  ottIds?: number[];
}

export interface TagParams {
  sortBy?: string;
  genreIds?: number[];
  keywordIds?: number[];
  mediaType?: MediaType;
  count?: number;
}

// Helper function to get tag title
export const getTagTitle = (tag: TagKey): string => {
  return TAG_LABELS[tag] || '콘텐츠';
};

// Helper function to fetch movies for the single-tag view
export const fetchMoviesForTagView = async (baseParams: BaseParams, activeTag: TagKey): Promise<Movie[]> => {
  const tagParams: TagParams = { sortBy: 'popularity.desc', count: API_DEFAULTS.SINGLE_TAG_COUNT };
  
  switch (activeTag) {
    case 'new': {
      tagParams.sortBy = 'popularity.desc';
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - API_DEFAULTS.RECENT_MONTHS);
      const dateFilter = threeMonthsAgo.toISOString().split('T')[0];
      return getRecentTrendingContent(dateFilter, API_DEFAULTS.SINGLE_TAG_COUNT, baseParams.ottIds);
    }
    case 'trending_day':
      if (!baseParams.ottIds || baseParams.ottIds.length === 0) {
        return getTrendingContent(API_DEFAULTS.SINGLE_TAG_COUNT, 'day');
      }
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'action':
      if (!baseParams.ottIds || baseParams.ottIds.length === 0) {
        return getGenreBasedTrending(GENRE_IDS.action, API_DEFAULTS.SINGLE_TAG_COUNT);
      }
      tagParams.genreIds = GENRE_IDS.action;
      tagParams.mediaType = 'movie'; // 액션은 주로 영화
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'comedy':
      if (!baseParams.ottIds || baseParams.ottIds.length === 0) {
        return getGenreBasedTrending(GENRE_IDS.comedy, API_DEFAULTS.SINGLE_TAG_COUNT);
      }
      tagParams.genreIds = GENRE_IDS.comedy;
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'drama':
      if (!baseParams.ottIds || baseParams.ottIds.length === 0) {
        return getGenreBasedTrending(GENRE_IDS.drama, API_DEFAULTS.SINGLE_TAG_COUNT);
      }
      tagParams.genreIds = GENRE_IDS.drama;
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'horror':
      if (!baseParams.ottIds || baseParams.ottIds.length === 0) {
        return getGenreBasedTrending(GENRE_IDS.horror, API_DEFAULTS.SINGLE_TAG_COUNT);
      }
      tagParams.genreIds = GENRE_IDS.horror;
      tagParams.mediaType = 'movie'; // 공포는 주로 영화
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'scifi':
      tagParams.genreIds = GENRE_IDS.scifi;
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'animation':
      // 애니메이션은 실제 인기도 기반으로 정확한 시청률 순위 제공
      return getTruePopularContent(GENRE_IDS.animation, API_DEFAULTS.SINGLE_TAG_COUNT, baseParams.ottIds);
    case 'documentary':
      tagParams.genreIds = GENRE_IDS.documentary;
      tagParams.sortBy = 'popularity.desc';
      break;
    case 'romance':
      tagParams.genreIds = GENRE_IDS.romance;
      tagParams.sortBy = 'popularity.desc';
      break;
  }
  return discoverMovies({ ...baseParams, ...tagParams });
};

// Helper function to fetch movies for the default genre-section view
export const fetchMoviesForDefaultView = async (baseParams: BaseParams) => {
  const sectionParams = { ...baseParams, count: API_DEFAULTS.COUNT };
  const popularParams = { ...sectionParams, sortBy: 'popularity.desc' };

  const getTodayPopular = async () => {
    if (!baseParams.ottIds || baseParams.ottIds.length === 0) {
      return getTrendingContent(API_DEFAULTS.COUNT, 'day');
    }
    return discoverMovies(popularParams);
  };

  return Promise.all([
    discoverMovies({ ...sectionParams, sortBy: 'primary_release_date.desc' }), // 신작
    getTodayPopular(), // 오늘 인기
    discoverMovies({ ...popularParams, genreIds: GENRE_IDS.action, mediaType: 'movie' }), // 액션
    discoverMovies({ ...popularParams, genreIds: GENRE_IDS.comedy }), // 코미디
    discoverMovies({ ...popularParams, genreIds: GENRE_IDS.drama }), // 드라마
    getTruePopularContent(GENRE_IDS.animation, API_DEFAULTS.COUNT, baseParams.ottIds), // 애니메이션 (실제 인기도)
    discoverMovies({ ...popularParams, genreIds: GENRE_IDS.horror, mediaType: 'movie' }), // 공포
  ]);
};