import Movie from "@src/types/Movie";
import { MovieCard } from "@components/index";
import { StyledMovieList } from "./styles";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <StyledMovieList>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </StyledMovieList>
  );
};

export default MovieList;
