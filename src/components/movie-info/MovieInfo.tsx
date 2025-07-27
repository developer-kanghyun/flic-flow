import { StyledMovieInfo } from "./styles";
import Movie from "@src/types/Movie";

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const title = movie.title || movie.name || "제목 없음";
  const releaseDate = movie.release_date || movie.first_air_date || "미정";
  const contentType = movie.media_type === 'tv' ? 'TV 시리즈' : '영화';
  
  return (
    <StyledMovieInfo>
      <h2>{title}</h2>
      <p><strong>타입:</strong> {contentType}</p>
      <p><strong>{movie.media_type === 'tv' ? '첫 방영일' : '개봉일'}:</strong> {releaseDate}</p>
      <p><strong>평점:</strong> {movie.vote_average}</p>
      <p><strong>줄거리:</strong> {movie.overview}</p>
    </StyledMovieInfo>
  );
};

export default MovieInfo;
