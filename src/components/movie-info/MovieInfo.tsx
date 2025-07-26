import { StyledMovieInfo } from "./styles";
import Movie from "@src/types/Movie";

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  return (
    <StyledMovieInfo>
      <h2>{movie.title}</h2>
      <p><strong>개봉일:</strong> {movie.release_date}</p>
      <p><strong>평점:</strong> {movie.vote_average}</p>
      <p><strong>줄거리:</strong> {movie.overview}</p>
      {/* 추가적인 영화 정보 (장르, 출연진 등)는 여기에 추가 */}
    </StyledMovieInfo>
  );
};

export default MovieInfo;
