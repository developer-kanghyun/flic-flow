import React, { useEffect, useState } from "react";
import { StyledBody } from "./styles";
import Movie from "@src/types/Movie"; // Updated import path
import { getMovieDetail } from "@src/api/tmdbApi"; // Import getMovieDetail
import { Link } from "react-router-dom"; // Import Link

const WatchList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
        const validMovieIds = savedWatchlist.filter((id: unknown) => typeof id === 'number' && !isNaN(id));

        if (validMovieIds.length === 0) {
          setMovies([]);
          setLoading(false);
          return;
        }

        const movieDetailsPromises = validMovieIds.map((movieId: number) =>
          getMovieDetail(movieId)
        );
        const fetchedMovies = await Promise.all(movieDetailsPromises);
        setMovies(fetchedMovies);
      } catch (err) {
        console.error("Error fetching watchlist movies:", err);
        setError("찜한 영화를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, []);

  if (loading) return <p>찜한 영화 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <StyledBody>
      <h1>찜한 영화</h1>
      {movies.length === 0 ? (
        <p>찜한 영화가 없습니다.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/detail/${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', color: '#fff' }}>No Image</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </StyledBody>
  );
};

export default WatchList;
