import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StyledSearched, StyledSearchResult } from "@pages/searched/styles";
import { StyledBody } from "@pages/main/styles";
import { searchMovies } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";
import { MovieList } from "@components/index";

const Searched = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        const results = await searchMovies(decodedQuery);
        setMovies(results);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("영화를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <StyledBody>
      <StyledSearchResult>검색 결과</StyledSearchResult>
      <StyledSearched>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          movies.length > 0 ? (
            <div>
              <p>검색어 : "{query ? decodeURIComponent(query) : ''}"</p>
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
