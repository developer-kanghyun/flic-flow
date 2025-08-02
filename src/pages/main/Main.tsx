import { useEffect, useState, useCallback, useMemo } from "react";
import { StyledBody, StyledMainTopArea, StyledContentArea } from '@src/pages/main/styles';
import TagBar from "@src/components/tag-bar/TagBar";
import SelectedOttsDisplay from "@src/components/selected-otts-display/SelectedOttsDisplay";
import TopFiveList from "@src/components/top-five-list/TopFiveList";
import MovieCarousel from "@src/components/movie-carousel/MovieCarousel";
import HybridMovieSection from "@src/components/hybrid-movie-section/HybridMovieSection";
import HeroBanner from "@src/components/hero-banner/HeroBanner";
import { useFilterStore } from "@src/store/filterStore";
import { fetchMoviesForTagView, fetchMoviesForDefaultView, getTagTitle } from "@src/utils/movieHelpers";
import Movie from "@src/types/Movie";
import type { LoadingState } from "@src/types/common";

interface MovieSections {
  new: Movie[];
  popular: Movie[];
  action: Movie[];
  comedy: Movie[];
  drama: Movie[];
  animation: Movie[];
  horror: Movie[];
}

const initialMovieSections: MovieSections = {
  new: [],
  popular: [],
  action: [],
  comedy: [],
  drama: [],
  animation: [],
  horror: [],
};

const Main = () => {
  const { selectedOtts, activeTag } = useFilterStore();
  const [movieSections, setMovieSections] = useState<MovieSections>(initialMovieSections);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  const clearAllMovieSections = useCallback(() => {
    setMovieSections(initialMovieSections);
  }, []);

  const fetchMovies = useCallback(async () => {
    setLoadingState({ isLoading: true, error: null });
    
    try {
      const baseParams = { ottIds: selectedOtts };
      
      if (activeTag && activeTag !== 'all') {
        const results = await fetchMoviesForTagView(baseParams, activeTag as import('@src/types/common').TagKey);
        setMovieSections({
          ...initialMovieSections,
          popular: results,
        });
      } else {
        const [newM, popM, actM, comM, draM, aniM, horM] = await fetchMoviesForDefaultView(baseParams);
        setMovieSections({
          new: newM,
          popular: popM,
          action: actM,
          comedy: comM,
          drama: draM,
          animation: aniM,
          horror: horM,
        });
      }
      setLoadingState({ isLoading: false, error: null });
    } catch (err) {
      console.error('Error fetching movies:', err);
      const errorMessage = err instanceof Error ? err.message : '영화 정보를 불러오는데 실패했습니다.';
      setLoadingState({ isLoading: false, error: errorMessage });
      clearAllMovieSections();
    }
  }, [selectedOtts, activeTag, clearAllMovieSections]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // 메모이제이션된 계산값들
  const allMovies = useMemo(() => 
    Object.values(movieSections), 
    [movieSections]
  );
  
  const noMoviesFound = useMemo(() => 
    !loadingState.isLoading && !loadingState.error && allMovies.every(list => list.length === 0),
    [loadingState.isLoading, loadingState.error, allMovies]
  );
  
  const currentTagTitle = useMemo(() => 
    getTagTitle((activeTag as import('@src/types/common').TagKey) || 'all'),
    [activeTag]
  );

  return (
    <StyledBody>
      <StyledMainTopArea>
        <SelectedOttsDisplay />
        <TagBar />
      </StyledMainTopArea>

      <StyledContentArea>
        {loadingState.isLoading && <div className="loading">영화 로딩 중...</div>}
        {loadingState.error && <div className="error">{loadingState.error}</div>}
        
        {!loadingState.isLoading && !loadingState.error && (
          <>
            {activeTag !== 'all' ? (
              <>
                {movieSections.popular.length > 0 && (
                  <HeroBanner movie={movieSections.popular[0]} />
                )}
                <TopFiveList movies={movieSections.popular} title={currentTagTitle} />
                {movieSections.popular.length > 5 && (
                  <MovieCarousel 
                    movies={movieSections.popular.slice(5, 26)} 
                    title={`${currentTagTitle} 더보기`} 
                  />
                )}
              </>
            ) : (
              <>
                {movieSections.new.length > 0 && (
                  <HybridMovieSection movies={movieSections.new} title="신작" />
                )}
                {movieSections.popular.length > 0 && (
                  <HybridMovieSection movies={movieSections.popular} title="인기" />
                )}
                {movieSections.action.length > 0 && (
                  <HybridMovieSection movies={movieSections.action} title="액션" />
                )}
                {movieSections.comedy.length > 0 && (
                  <HybridMovieSection movies={movieSections.comedy} title="코미디" />
                )}
                {movieSections.drama.length > 0 && (
                  <HybridMovieSection movies={movieSections.drama} title="드라마" />
                )}
                {movieSections.animation.length > 0 && (
                  <HybridMovieSection movies={movieSections.animation} title="애니메이션" />
                )}
                {movieSections.horror.length > 0 && (
                  <HybridMovieSection movies={movieSections.horror} title="공포" />
                )}
              </>
            )}

            {noMoviesFound && (
              <div className="no-results">표시할 영화가 없습니다. 필터를 조정해보세요.</div>
            )}
          </>
        )}
      </StyledContentArea>
    </StyledBody>
  );
};

export default Main;

