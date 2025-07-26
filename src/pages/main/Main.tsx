import React, { useEffect, useState, useCallback } from "react";
import { StyledBody, StyledMainTopArea, StyledContentArea } from "./styles";
import { TagBar, SelectedOttsDisplay, MovieList, TopFiveList, MovieCarousel, HybridMovieSection } from "@components/index";
import { useFilterStore } from "@src/store/filterStore";
import { discoverMovies } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";

// Helper function to fetch movies for the single-tag view
interface BaseParams {
  ottIds?: number[];
}

interface TagParams {
  sortBy?: string;
  genreIds?: number[];
  mediaType?: "movie" | "tv";
  count?: number;
}

// Helper function to get tag title
const getTagTitle = (tag: string): string => {
  switch (tag) {
    case 'new': return '신작';
    case 'popular': return '인기';
    case 'drama': return '드라마';
    case 'animation': return '애니메이션';
    case 'documentary': return '다큐멘터리';
    case 'entertainment': return '예능';
    case 'sports': return '스포츠';
    case 'all': return '전체 콘텐츠';
    default: return '콘텐츠';
  }
};

// Helper function to fetch movies for the single-tag view
const fetchMoviesForTagView = async (baseParams: BaseParams, activeTag: string): Promise<Movie[]> => {
  const tagParams: TagParams = { sortBy: 'popular', count: 26 };
  switch (activeTag) {
    case 'new':
      tagParams.sortBy = 'primary_release_date.desc';
      break;
    case 'popular':
      break; // Default is popular
    case 'drama':
      tagParams.genreIds = [18];
      tagParams.mediaType = 'tv';
      break;
    case 'animation':
      tagParams.genreIds = [16];
      break;
    case 'documentary':
      tagParams.genreIds = [99];
      tagParams.mediaType = 'tv'; // Assuming documentaries can be TV shows too
      break;
    case 'entertainment':
      tagParams.genreIds = [10767];
      tagParams.mediaType = 'tv';
      break;
    case 'sports':
      tagParams.genreIds = [10770];
      tagParams.mediaType = 'movie';
      break;
  }
  return discoverMovies({ ...baseParams, ...tagParams });
};

// Helper function to fetch movies for the default genre-section view
const fetchMoviesForDefaultView = (baseParams: BaseParams) => {
  const sectionParams = { ...baseParams, count: 20 };
  const popularParams = { ...sectionParams, sortBy: 'popular' };

  return Promise.all([
    discoverMovies({ ...sectionParams, sortBy: 'primary_release_date.desc' }),
    discoverMovies(popularParams),
    discoverMovies({ ...popularParams, genreIds: [18], mediaType: 'tv' }),
    discoverMovies({ ...popularParams, genreIds: [16] }),
    discoverMovies({ ...popularParams, genreIds: [99] }),
    discoverMovies({ ...popularParams, genreIds: [10767], mediaType: 'tv' }),
    discoverMovies({ ...popularParams, genreIds: [10770], mediaType: 'movie' }),
  ]);
};

const Main = () => {
  const { selectedOtts, activeTag } = useFilterStore();
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [entertainmentMovies, setEntertainmentMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [animationMovies, setAnimationMovies] = useState<Movie[]>([]);
  const [documentaryMovies, setDocumentaryMovies] = useState<Movie[]>([]);
  const [sportsMovies, setSportsMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearAllMovieLists = () => {
    setNewMovies([]);
    setPopularMovies([]);
    setDramaMovies([]);
    setAnimationMovies([]);
    setDocumentaryMovies([]);
    setEntertainmentMovies([]);
    setSportsMovies([]);
  };

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const baseParams = { ottIds: selectedOtts };
      if (activeTag && activeTag !== 'all') {
        const results = await fetchMoviesForTagView(baseParams, activeTag);
        clearAllMovieLists();
        setPopularMovies(results); // Use popularMovies for the single list
      } else {
        const [newM, popM, draM, aniM, docM, entM, spoM] = await fetchMoviesForDefaultView(baseParams);
        setNewMovies(newM);
        setPopularMovies(popM);
        setDramaMovies(draM);
        setAnimationMovies(aniM);
        setDocumentaryMovies(docM);
        setEntertainmentMovies(entM);
        setSportsMovies(spoM);
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
    newMovies, popularMovies, dramaMovies, animationMovies, 
    documentaryMovies, entertainmentMovies, sportsMovies
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
                <TopFiveList movies={popularMovies} title={getTagTitle(activeTag || 'all')} />
                {popularMovies.length > 5 && (
                  <MovieCarousel movies={popularMovies.slice(5, 26)} title={`${getTagTitle(activeTag || 'all')} 더보기`} />
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
                {dramaMovies.length > 0 && (
                  <HybridMovieSection movies={dramaMovies} title="드라마" />
                )}
                {animationMovies.length > 0 && (
                  <HybridMovieSection movies={animationMovies} title="애니메이션" />
                )}
                {documentaryMovies.length > 0 && (
                  <HybridMovieSection movies={documentaryMovies} title="다큐멘터리" />
                )}
                {entertainmentMovies.length > 0 && (
                  <HybridMovieSection movies={entertainmentMovies} title="예능" />
                )}
                {sportsMovies.length > 0 && (
                  <HybridMovieSection movies={sportsMovies} title="스포츠" />
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

