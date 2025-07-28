import { useEffect, useState } from "react";
import { StyledBody } from "./styles";
import Movie from "@src/types/Movie"; // Updated import path
import { getMovieDetail, tmdbApi } from "@src/api/tmdbApi"; // Import getMovieDetail
import { Link } from "react-router-dom"; // Import Link
import { WatchListButton } from "@components/index";
import { createImageErrorHandler } from "@src/utils/constants";

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

        const movieDetailsPromises = validMovieIds.map(async (movieId: number) => {
          try {
            // 먼저 영화로 시도
            return await getMovieDetail(movieId);
          } catch (error) {
            try {
              // 영화로 실패하면 TV로 시도
              const response = await tmdbApi.get(`/tv/${movieId}`);
              return { ...response.data, media_type: 'tv' as const };
            } catch (tvError) {
              console.error(`Failed to fetch both movie and TV for ID ${movieId}:`, error, tvError);
              throw error;
            }
          }
        });
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
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h2>아직 찜한 영화가 없어요</h2>
          <p>좋아하는 영화나 TV 프로그램을 찜하여 나중에 시청해보세요!</p>
          <div className="empty-actions">
            <Link to="/" className="discover-btn">
              인기 영화 둘러보기
            </Link>
          </div>
        </div>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <div className="watchlist-button-wrapper">
                <WatchListButton movieId={movie.id} />
              </div>
              <Link to={`/detail/${movie.id}?type=${movie.media_type || 'movie'}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    onError={createImageErrorHandler(movie.poster_path)}
                    loading="lazy"
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
