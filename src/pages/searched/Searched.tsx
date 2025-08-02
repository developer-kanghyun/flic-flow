import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { StyledSearched, StyledSearchResult } from "@pages/searched/styles";
import { StyledBody } from "@pages/main/styles";
import { searchMovies, searchByActor, getContentWatchProviders } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";
import { MovieList } from "@components/index";
import { useFilterStore } from "@src/store/filterStore";

// 간단한 메모리 캐시
const searchCache = new Map<string, Movie[]>();

const Searched = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword");
  const searchType = searchParams.get("type"); // 'actor' 또는 일반 검색
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 필터 스토어에서 선택된 OTT 서비스들 가져오기
  const { selectedOtts } = useFilterStore();
  const hasOttFilter = selectedOtts.length > 0;

  // 캐시 키 생성
  const cacheKey = useMemo(() => {
    if (!query) return '';
    return `${query}_${searchType || 'general'}_${selectedOtts.join(',')}`;
  }, [query, searchType, selectedOtts]);

  useEffect(() => {
    // 페이지 이동 시 맨 위로 스크롤
    window.scrollTo(0, 0);
    
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      // 캐시 확인
      if (cacheKey && searchCache.has(cacheKey)) {
        console.log('Using cached results for:', cacheKey);
        setMovies(searchCache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const decodedQuery = decodeURIComponent(query);
        let results: Movie[];
        
        // 먼저 기본 검색 실행
        let rawResults: Movie[] = [];
        
        if (searchType === 'actor') {
          rawResults = await searchByActor(decodedQuery);
        } else {
          // 일반 검색만 수행 (배우 검색 제거로 성능 개선)
          rawResults = await searchMovies(decodedQuery);
        }
        
        // OTT 필터가 선택되어 있으면 필터링 적용
        if (hasOttFilter) {
          // 병렬 처리로 성능 최적화
          const moviesToCheck = rawResults.slice(0, 30); // 30개로 제한하여 성능 향상
          
          const ottPromises = moviesToCheck.map(async (movie) => {
            try {
              const watchProviders = await getContentWatchProviders(movie.id, movie.media_type);
              
              if (watchProviders && watchProviders.flatrate) {
                const hasSelectedOtt = watchProviders.flatrate.some(provider => 
                  selectedOtts.includes(provider.provider_id)
                );
                
                return hasSelectedOtt ? movie : null;
              }
              return null;
            } catch (error) {
              console.log(`OTT check failed for movie ${movie.id}:`, error);
              return null;
            }
          });
          
          const ottResults = await Promise.all(ottPromises);
          results = ottResults.filter((movie): movie is Movie => movie !== null);
        } else {
          results = rawResults;
        }
        
        // 캐시에 저장
        if (cacheKey) {
          searchCache.set(cacheKey, results);
          // 캐시 크기 제한 (최대 50개)
          if (searchCache.size > 50) {
            const firstKey = searchCache.keys().next().value;
            if (firstKey) {
              searchCache.delete(firstKey);
            }
          }
        }
        
        setMovies(results);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("영화를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, searchType, selectedOtts, cacheKey]);

  return (
    <StyledBody>
      <StyledSearchResult>검색 결과</StyledSearchResult>
      <StyledSearched>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          movies.length > 0 ? (
            <div>
              <p>검색어: "{query ? decodeURIComponent(query) : 'N/A'}"</p>
              <MovieList movies={movies} />
            </div>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )
        )}
      </StyledSearched>
    </StyledBody>
  );
};

export default Searched;
