import React, { useEffect, useState, useCallback } from "react";
import { StyledBody, StyledMainTopArea } from "./styles";
import { TagBar, SelectedOttsDisplay, MovieList } from "@components/index";
import { useFilterStore } from "@src/store/filterStore";
import { discoverMovies } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";

// Helper function to fetch movies for the single-tag view
const fetchMoviesForTagView = async (baseParams: any, activeTag: string) => {
  let tagParams: any = { sortBy: 'popular', count: 20 };
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
const fetchMoviesForDefaultView = (baseParams: any) => {
  const sectionParams = { ...baseParams, count: 5 };
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
    <>
      <StyledBody>
        <StyledMainTopArea>
          <SelectedOttsDisplay />
          <TagBar />
        </StyledMainTopArea>

        {loading && <p>영화 로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        {!loading && !error && (
          <>
            {activeTag !== 'all' ? (
              <MovieList movies={popularMovies} />
            ) : (
              <>
                {newMovies.length > 0 && (<div><h2>신작</h2><MovieList movies={newMovies} /></div>)}
                {popularMovies.length > 0 && (<div><h2>인기</h2><MovieList movies={popularMovies} /></div>)}
                {dramaMovies.length > 0 && (<div><h2>드라마</h2><MovieList movies={dramaMovies} /></div>)}
                {animationMovies.length > 0 && (<div><h2>애니메이션</h2><MovieList movies={animationMovies} /></div>)}
                {documentaryMovies.length > 0 && (<div><h2>다큐멘터리</h2><MovieList movies={documentaryMovies} /></div>)}
                {entertainmentMovies.length > 0 && (<div><h2>예능</h2><MovieList movies={entertainmentMovies} /></div>)}
                {sportsMovies.length > 0 && (<div><h2>스포츠</h2><MovieList movies={sportsMovies} /></div>)}
              </>
            )}

            {noMoviesFound && (
               <p>표시할 영화가 없습니다. 필터를 조정해보세요.</p>
            )}
          </>
        )}
      </StyledBody>
    </>
  );
};

export default Main;

