import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StyledSearched, StyledSearchResult } from "@pages/searched/styles";
import { StyledBody } from "@pages/main/styles";
import { searchMovies, searchByActor, enhancedSearch, searchByActorWithOTT, searchMoviesWithOTT, filterByOTTAvailability } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";
import { MovieList } from "@components/index";
import { useFilterStore } from "@src/store/filterStore";

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

  useEffect(() => {
    // 페이지 이동 시 맨 위로 스크롤
    window.scrollTo(0, 0);
    
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]);
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
          // 배우 검색을 먼저 시도하고, 결과가 없으면 일반 검색
          const actorResults = await searchByActor(decodedQuery);
          if (actorResults.length > 0) {
            // 중복 제거
            const uniqueResults: Movie[] = [];
            const seenIds = new Set<number>();
            
            actorResults.forEach(movie => {
              if (!seenIds.has(movie.id)) {
                seenIds.add(movie.id);
                uniqueResults.push(movie);
              }
            });
            
            rawResults = uniqueResults;
          } else {
            rawResults = await searchMovies(decodedQuery);
          }
        }
        
        // OTT 필터가 선택되어 있으면 필터링 적용
        if (hasOttFilter) {
          // 선택된 OTT 서비스에서 시청 가능한 콘텐츠만 필터링
          const ottFilteredResults: Movie[] = [];
          
          for (const movie of rawResults.slice(0, 50)) { // 성능을 위해 첫 50개만 체크
            try {
              const watchProviders = await import("@src/api/tmdbApi").then(api => 
                api.getContentWatchProviders(movie.id, movie.media_type)
              );
              
              if (watchProviders && watchProviders.flatrate) {
                const hasSelectedOtt = watchProviders.flatrate.some(provider => 
                  selectedOtts.includes(provider.provider_id)
                );
                
                if (hasSelectedOtt) {
                  ottFilteredResults.push(movie);
                }
              }
            } catch (error) {
              console.log(`OTT check failed for movie ${movie.id}:`, error);
            }
          }
          
          results = ottFilteredResults;
        } else {
          results = rawResults;
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
  }, [query, searchType, selectedOtts]);

  return (
    <StyledBody>
      <StyledSearchResult>검색 결과</StyledSearchResult>
      <StyledSearched>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          movies.length > 0 ? (
            <div>
              <p>검색어: "{query ? decodeURIComponent(query) : ''}"</p>
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
