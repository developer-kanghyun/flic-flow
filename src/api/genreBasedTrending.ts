import { tmdbApi } from '@src/api/tmdbApi';
import Movie from '@src/types/Movie';

// 장르별 순수 인기도(시청률) 기준 트렌딩 콘텐츠
export const getGenreBasedTrending = async (genreIds: number[], count: number = 20): Promise<Movie[]> => {
  try {
    // 오늘의 트렌딩에서 해당 장르만 필터링 (순수 인기도 기준)
    const response = await tmdbApi.get<{ results: Movie[] }>('/trending/all/day');
    const today = new Date().toISOString().split('T')[0];
    
    const filteredResults = response.data.results
      .filter(item => {
        // 장르 ID가 포함된 항목만 선택
        const hasGenre = item.genre_ids?.some(id => genreIds.includes(id));
        
        // 미래 작품 제외 (이미 출시된 것만) - 더 엄격한 필터링
        const releaseDate = item.release_date || item.first_air_date;
        const isReleased = releaseDate && releaseDate <= today;
        
        return hasGenre && isReleased;
      })
      .map(item => ({
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv')
      }))
      .slice(0, Math.min(count, 10)); // 트렌딩에서는 최대 10개만

    // 트렌딩에서 충분하지 않으면 discover API로 보완 (순수 인기도 기준)
    if (filteredResults.length < count) {
      const remainingCount = count - filteredResults.length;
      
      const [movieResponse, tvResponse] = await Promise.all([
        tmdbApi.get<{ results: Movie[] }>('/discover/movie', {
          params: {
            with_genres: genreIds.join(','),
            sort_by: 'popularity.desc', // 순수 인기도만 사용
            'primary_release_date.lte': today,
            'primary_release_date.gte': '2020-01-01', // 최근 콘텐츠만
            'vote_count.gte': 10
          }
        }),
        tmdbApi.get<{ results: Movie[] }>('/discover/tv', {
          params: {
            with_genres: genreIds.join(','),
            sort_by: 'popularity.desc', // 순수 인기도만 사용
            'first_air_date.lte': today,
            'first_air_date.gte': '2020-01-01', // 최근 콘텐츠만
            'vote_count.gte': 10
          }
        })
      ]);

      const additionalResults = [
        ...movieResponse.data.results.map(item => ({ ...item, media_type: 'movie' as const })),
        ...tvResponse.data.results.map(item => ({ ...item, media_type: 'tv' as const }))
      ]
        .filter(item => !filteredResults.some(existing => existing.id === item.id))
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0)) // 순수 인기도 정렬
        .slice(0, remainingCount);

      filteredResults.push(...additionalResults);
    }

    return filteredResults.slice(0, count);
  } catch (error) {
    throw error;
  }
};

// TMDB 인스턴스를 export해서 다른 곳에서 사용할 수 있도록
export { tmdbApi };