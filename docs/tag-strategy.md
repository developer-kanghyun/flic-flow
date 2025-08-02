# 태그 분류 전략 개선안

## 현재 문제점
1. 일부 태그는 장르 기반 (애니메이션, 다큐멘터리)
2. 일부는 미디어 타입 기반 (시리즈)
3. 일부는 키워드 기반 (스포츠)
4. 일부는 정렬 기반 (신작, 인기)
5. API 매핑이 일관성 없음

## API 기반 분류 전략

### 1. 시간 기반 분류 (Trending/Discovery API)
- **전체**: 모든 콘텐츠
- **오늘 인기**: `/trending/all/day` 
- **이번 주 인기**: `/trending/all/week`
- **신작**: `primary_release_date.gte` 최근 3개월

### 2. 미디어 타입 기반 분류
- **영화**: `/discover/movie`
- **TV 시리즈**: `/discover/tv`
- **전체**: 둘 다

### 3. 장르 기반 분류 (실제 TMDB 장르 활용)

#### 영화 장르 (Movie Genres)
- **액션** (28): 액션 영화
- **코미디** (35): 코미디 영화  
- **드라마** (18): 드라마 영화
- **공포** (27): 공포 영화
- **SF** (878): SF 영화
- **애니메이션** (16): 애니메이션 영화
- **다큐멘터리** (99): 다큐멘터리
- **로맨스** (10749): 로맨스 영화
- **스릴러** (53): 스릴러 영화

#### TV 장르 (TV Genres)  
- **드라마** (18): TV 드라마
- **코미디** (35): TV 코미디
- **애니메이션** (16): TV 애니메이션
- **다큐멘터리** (99): TV 다큐멘터리
- **리얼리티** (10764): 리얼리티 쇼
- **토크쇼** (10767): 토크쇼
- **키즈** (10762): 어린이 프로그램

## 추천 전략 옵션

### 옵션 1: 하이브리드 접근 (현재 개선)
```javascript
const IMPROVED_TAGS = {
  // 시간/인기 기반
  all: { label: '전체', api: 'trending/all/day' },
  trending_day: { label: '오늘 인기', api: 'trending/all/day' },
  trending_week: { label: '이번 주', api: 'trending/all/week' },
  new_releases: { label: '신작', api: 'discover', filter: 'recent' },
  
  // 미디어 타입
  movies: { label: '영화', api: 'discover/movie' },
  tv_shows: { label: 'TV 프로그램', api: 'discover/tv' },
  
  // 주요 장르
  action: { label: '액션', genreIds: [28], mediaType: 'movie' },
  comedy: { label: '코미디', genreIds: [35] },
  drama: { label: '드라마', genreIds: [18] },
  animation: { label: '애니메이션', genreIds: [16] },
  documentary: { label: '다큐멘터리', genreIds: [99] },
  horror: { label: '공포', genreIds: [27], mediaType: 'movie' },
  scifi: { label: 'SF', genreIds: [878, 10765] }, // movie SF + TV Sci-Fi & Fantasy
}
```

### 옵션 2: 카테고리별 분리
```javascript
// 메인 카테고리
const MAIN_CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'trending', label: '인기' },
  { key: 'new', label: '신작' },
]

// 장르 카테고리  
const GENRE_CATEGORIES = [
  { key: 'action', label: '액션', genreIds: [28] },
  { key: 'comedy', label: '코미디', genreIds: [35] },
  { key: 'drama', label: '드라마', genreIds: [18] },
  { key: 'animation', label: '애니메이션', genreIds: [16] },
  { key: 'horror', label: '공포', genreIds: [27] },
  { key: 'scifi', label: 'SF', genreIds: [878, 10765] },
]

// 미디어 타입
const MEDIA_TYPES = [
  { key: 'movies', label: '영화', mediaType: 'movie' },
  { key: 'tv', label: 'TV', mediaType: 'tv' },
]
```

### 옵션 3: 두 단계 필터링
1단계: 미디어 타입 선택 (영화/TV/전체)
2단계: 장르/정렬 선택

## 구현 우선순위

1. **즉시 개선**: 현재 태그의 API 매핑 정확성 향상
2. **단기**: 인기 장르 추가 (액션, 공포, SF 등)
3. **중기**: 카테고리별 분리된 UI
4. **장기**: 개인화된 추천 태그