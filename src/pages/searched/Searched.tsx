import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StyledSearched, StyledSearchResult } from "@pages/searched/styles";
import { StyledBody } from "@pages/main/styles";
import { searchMovies } from "@src/api/tmdbApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

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
              <ul>
                {movies.map((movie) => (
                  <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <p>개봉일: {movie.release_date}</p>
                    <p>평점: {movie.vote_average}</p>
                    {movie.poster_path && (
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width="100" />
                    )}
                  </li>
                ))}
              </ul>
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
