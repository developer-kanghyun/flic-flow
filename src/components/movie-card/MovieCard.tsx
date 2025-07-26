import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import { StyledMovieCard, WatchListButtonWrapper } from "./styles";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <StyledMovieCard>
      <WatchListButtonWrapper>
        <WatchListButton movieId={movie.id} />
      </WatchListButtonWrapper>
      <Link to={`/detail/${movie.id}`}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </Link>
    </StyledMovieCard>
  );
};

export default MovieCard;
