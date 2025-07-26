import { StyledMoviePlayerContainer } from "./styles";
import { MoviePlayer } from "@components/index";
import Movie from "@src/types/Movie";

interface MoviePlayerContainerProps {
  movieId: number;
  movie: Movie;
}

const MoviePlayerContainer = ({ movieId, movie }: MoviePlayerContainerProps) => {
  return (
    <StyledMoviePlayerContainer>
      <MoviePlayer movieId={movieId} movie={movie} />
    </StyledMoviePlayerContainer>
  );
};

export default MoviePlayerContainer;
