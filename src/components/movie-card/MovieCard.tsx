import { memo } from "react";
import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import WatchListButton from "@src/components/watch-list-button/WatchListButton";
import { StyledMovieCard, WatchListButtonWrapper } from "./styles";
import { createImageErrorHandler, getPosterUrl } from "@src/utils/constants";
import { getMediaType, getMovieTitle } from "@src/utils/movieHelpers";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  const posterUrl = getPosterUrl(movie.poster_path);
  const mediaType = getMediaType(movie);
  const detailUrl = `/detail/${movie.id}?type=${mediaType}`;
  const title = getMovieTitle(movie);

  return (
    <StyledMovieCard>
      <WatchListButtonWrapper>
        <WatchListButton movieId={movie.id} />
      </WatchListButtonWrapper>
      <Link to={detailUrl}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title || "Movie"}
            loading="lazy"
            onError={createImageErrorHandler(movie.poster_path || undefined)}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </Link>
    </StyledMovieCard>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
