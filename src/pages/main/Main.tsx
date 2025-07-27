import { useEffect, useState, useCallback } from "react";
import { StyledBody, StyledMainTopArea, StyledContentArea } from "./styles";
import { TagBar, SelectedOttsDisplay, TopFiveList, MovieCarousel, HybridMovieSection, HeroBanner } from "@components/index";
import { useFilterStore } from "@src/store/filterStore";
import { fetchMoviesForTagView, fetchMoviesForDefaultView, getTagTitle } from "@src/utils/movieHelpers";
import Movie from "@src/types/Movie";

const Main = () => {
  const { selectedOtts, activeTag } = useFilterStore();
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [animationMovies, setAnimationMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearAllMovieLists = () => {
    setNewMovies([]);
    setPopularMovies([]);
    setActionMovies([]);
    setComedyMovies([]);
    setDramaMovies([]);
    setAnimationMovies([]);
    setHorrorMovies([]);
  };

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const baseParams = { ottIds: selectedOtts };
      
      if (activeTag && activeTag !== 'all') {
        const results = await fetchMoviesForTagView(baseParams, activeTag as import('@src/types/common').TagKey);
        clearAllMovieLists();
        setPopularMovies(results);
      } else {
        const [newM, popM, actM, comM, draM, aniM, horM] = await fetchMoviesForDefaultView(baseParams);
        setNewMovies(newM);
        setPopularMovies(popM);
        setActionMovies(actM);
        setComedyMovies(comM);
        setDramaMovies(draM);
        setAnimationMovies(aniM);
        setHorrorMovies(horM);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("영화를 불러오는 데 실패했습니다.");
      clearAllMovieLists();
    } finally {
      setLoading(false);
    }
  }, [selectedOtts, activeTag]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const allMovies = [
    newMovies, popularMovies, actionMovies, comedyMovies,
    dramaMovies, animationMovies, horrorMovies
  ];
  const noMoviesFound = !loading && !error && allMovies.every(list => list.length === 0);

  return (
    <StyledBody>
      <StyledMainTopArea>
        <SelectedOttsDisplay />
        <TagBar />
      </StyledMainTopArea>

      <StyledContentArea>
        {loading && <div className="loading">영화 로딩 중...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <>
            {activeTag !== 'all' ? (
              <>
                {popularMovies.length > 0 && (
                  <HeroBanner movie={popularMovies[0]} />
                )}
                <TopFiveList movies={popularMovies} title={getTagTitle((activeTag as import('@src/types/common').TagKey) || 'all')} />
                {popularMovies.length > 5 && (
                  <MovieCarousel movies={popularMovies.slice(5, 26)} title={`${getTagTitle((activeTag as import('@src/types/common').TagKey) || 'all')} 더보기`} />
                )}
              </>
            ) : (
              <>
                {newMovies.length > 0 && (
                  <HybridMovieSection movies={newMovies} title="신작" />
                )}
                {popularMovies.length > 0 && (
                  <HybridMovieSection movies={popularMovies} title="인기" />
                )}
                {actionMovies.length > 0 && (
                  <HybridMovieSection movies={actionMovies} title="액션" />
                )}
                {comedyMovies.length > 0 && (
                  <HybridMovieSection movies={comedyMovies} title="코미디" />
                )}
                {dramaMovies.length > 0 && (
                  <HybridMovieSection movies={dramaMovies} title="드라마" />
                )}
                {animationMovies.length > 0 && (
                  <HybridMovieSection movies={animationMovies} title="애니메이션" />
                )}
                {horrorMovies.length > 0 && (
                  <HybridMovieSection movies={horrorMovies} title="공포" />
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

