import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StyledBody, StyledMovieBoxWrapper } from "./styles";
import { MovieInfo, MoviePlayer, WatchListButton, OttLinkContainer } from "@components/index";
import { StyledMoviePlayerContainer } from "@components/movie-player-container/styles";
import { StyledMovieInfoContainer } from "@components/movie-info-container/styles";
import { getMovieDetail } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) {
        setError("영화 ID가 없습니다.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fetchedMovie = await getMovieDetail(Number(movieId));
        setMovie(fetchedMovie);
      } catch (err) {
        console.error("Error fetching movie detail:", err);
        setError("영화 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) return <p>영화 상세 정보 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <StyledBody>
        <StyledMovieBoxWrapper>
          <StyledMoviePlayerContainer>
            <MoviePlayer movieId={Number(movieId)} movie={movie} />
          </StyledMoviePlayerContainer>
          <StyledMovieInfoContainer>
            <MovieInfo movie={movie} />
            <WatchListButton movieId={movie.id} />
          </StyledMovieInfoContainer>
        </StyledMovieBoxWrapper>

        <OttLinkContainer movieId={Number(movieId)} movieTitle={movie.title}>
          <h2>시청하기</h2>
        </OttLinkContainer>
      </StyledBody>
    </>
  );
};

export default Detail;
