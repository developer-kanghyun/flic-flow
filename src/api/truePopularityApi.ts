import { tmdbApi } from './tmdbApi';
import Movie from '@src/types/Movie';


// Google Trends 대신 검색량 추정 (제목 길이와 인지도 기반)
const getSearchabilityScore = (movie: Movie): number => {
  const title = movie.title || movie.name || '';
  
  // 짧고 기억하기 쉬운 제목일수록 높은 점수
  const titleScore = Math.max(100 - title.length * 2, 10);
  
  // 평점이 높을수록 입소문 효과
  const ratingBonus = (movie.vote_average || 5) * 10;
  
  // 평가 수가 많을수록 인지도 높음
  const popularityBonus = Math.log((movie.vote_count || 1) + 1) * 5;
  
  return titleScore + ratingBonus + popularityBonus;
};

// 최근성 점수 계산
const getRecencyScore = (movie: Movie): number => {
  const releaseDate = movie.release_date || movie.first_air_date;
  if (!releaseDate) return 0;
  
  const today = new Date();
  const release = new Date(releaseDate);
  const daysDiff = Math.abs((today.getTime() - release.getTime()) / (1000 * 60 * 60 * 24));
  
  // 최근 30일 이내면 높은 점수, 그 후로는 감소
  if (daysDiff <= 30) return 100;
  if (daysDiff <= 90) return 80;
  if (daysDiff <= 365) return 60;
  if (daysDiff <= 365 * 2) return 40;
  return 20;
};

// JustWatch 스타일 인기도 시뮬레이션
const getJustWatchStyleScore = (movie: Movie): number => {
  // 실제 JustWatch API 대신 여러 요소 조합
  const popularity = movie.popularity || 0;
  const voteAverage = movie.vote_average || 0;
  const voteCount = movie.vote_count || 0;
  
  // 인기도가 높고, 평점이 좋고, 많은 사람이 평가한 작품
  return (popularity * 0.4) + (voteAverage * 10 * 0.3) + (Math.log(voteCount + 1) * 5 * 0.3);
};

// 소셜미디어 언급량 시뮬레이션 (키워드 기반)
const getSocialScore = (movie: Movie): number => {
  const title = (movie.title || movie.name || '').toLowerCase();
  
  // 화제성 있는 키워드들
  const trendingKeywords = [
    '시즌', 'season', '완결', '신작', '화제', 
    '마블', 'marvel', '디즈니', 'disney', '넷플릭스', 'netflix',
    '스파이더맨', '어벤져스', '원피스', '나루토', '귀멸의칼날',
    '오징어게임', '킹덤', '지옥', '라라랜드', '탑건'
  ];
  
  let score = 0;
  trendingKeywords.forEach(keyword => {
    if (title.includes(keyword)) {
      score += 20;
    }
  });
  
  return Math.min(score, 100);
};

// 종합 인기도 점수 계산
export const calculateTruePopularity = (movies: Movie[]): Movie[] => {
  const moviesWithScores = movies.map(movie => {
    const tmdbScore = movie.popularity || 0;
    const recentScore = getRecencyScore(movie);
    const ratingScore = getJustWatchStyleScore(movie);
    const socialScore = getSocialScore(movie);
    const searchScore = getSearchabilityScore(movie);
    
    // 가중치 적용한 종합 점수
    const totalScore = 
      tmdbScore * 0.25 +        // TMDB 트렌딩 25%
      recentScore * 0.2 +       // 최근성 20%
      ratingScore * 0.25 +      // 평점/인지도 25%
      socialScore * 0.15 +      // 소셜/화제성 15%
      searchScore * 0.15;       // 검색 가능성 15%
    
    return {
      ...movie,
      _truePopularityScore: totalScore
    };
  });
  
  // 종합 점수로 정렬
  return moviesWithScores.sort((a, b) => 
    (b._truePopularityScore || 0) - (a._truePopularityScore || 0)
  );
};

// 장르별 실제 인기 콘텐츠 가져오기
export const getTruePopularContent = async (genreIds: number[], count: number = 20, ottIds?: number[]): Promise<Movie[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // 1. TMDB 트렌딩 데이터 (OTT 필터링이 없을 때만)
    let trendingFiltered: Movie[] = [];
    if (!ottIds || ottIds.length === 0) {
      const trendingResponse = await tmdbApi.get<{ results: Movie[] }>('/trending/all/day');
      trendingFiltered = trendingResponse.data.results
        .filter(item => {
          const hasGenre = item.genre_ids?.some(id => genreIds.includes(id));
          const releaseDate = item.release_date || item.first_air_date;
          const isReleased = !releaseDate || releaseDate <= today;
          return hasGenre && isReleased;
        })
        .slice(0, 10);
    }
    
    // 2. Discover API로 보완 (최근 2년 + 인기순)
    const movieParams: Record<string, string | number> = {
      with_genres: genreIds.join(','),
      sort_by: 'popularity.desc',
      'primary_release_date.lte': today,
      'primary_release_date.gte': '2022-01-01',
      'vote_count.gte': 20
    };
    
    const tvParams: Record<string, string | number> = {
      with_genres: genreIds.join(','),
      sort_by: 'popularity.desc',
      'first_air_date.lte': today,
      'first_air_date.gte': '2022-01-01',
      'vote_count.gte': 15
    };
    
    // OTT 필터링 추가
    if (ottIds && ottIds.length > 0) {
      movieParams.with_watch_providers = ottIds.join('|');
      movieParams.watch_region = 'KR';
      tvParams.with_watch_providers = ottIds.join('|');
      tvParams.watch_region = 'KR';
    }
    
    const [movieResponse, tvResponse] = await Promise.all([
      tmdbApi.get<{ results: Movie[] }>('/discover/movie', { params: movieParams }),
      tmdbApi.get<{ results: Movie[] }>('/discover/tv', { params: tvParams })
    ]);
    
    // 3. 모든 결과 합치기
    const allResults = [
      ...trendingFiltered.map(item => ({ 
        ...item, 
        media_type: item.media_type || (item.title ? 'movie' : 'tv') 
      })),
      ...movieResponse.data.results.map(item => ({ ...item, media_type: 'movie' as const })),
      ...tvResponse.data.results.map(item => ({ ...item, media_type: 'tv' as const }))
    ];
    
    // 중복 제거
    const uniqueResults = Array.from(
      new Map(allResults.map(item => [item.id, item])).values()
    );
    
    // 4. 실제 인기도 계산 및 정렬
    const sortedByTruePopularity = calculateTruePopularity(uniqueResults);
    
    return sortedByTruePopularity.slice(0, count);
  } catch (error) {
    console.error('Error fetching true popular content:', error);
    throw error;
  }
};