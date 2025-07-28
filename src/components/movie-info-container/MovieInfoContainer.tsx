import { StyledMovieInfoContainer } from "./styles";
import MovieInfo from "@src/components/movie-info/MovieInfo";
import Movie from "@src/types/Movie";

interface MovieInfoContainerProps {
  movie: Movie;
}

const MovieInfoContainer = ({ movie }: MovieInfoContainerProps) => {
  return (
    <StyledMovieInfoContainer>
      <MovieInfo movie={movie} />
    </StyledMovieInfoContainer>
  );
};

export default MovieInfoContainer;
