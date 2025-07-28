import { memo } from "react";
import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import WatchListButton from "@src/components/watch-list-button/WatchListButton";
import { StyledMovieCard, WatchListButtonWrapper } from "./styles";
import { IMAGE_BASE_URL, POSTER_SIZES, createImageErrorHandler } from "@src/utils/constants";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${POSTER_SIZES.MEDIUM}${movie.poster_path}`
    : null;

  // 콘텐츠 타입 결정: name이 있고 title이 없으면 TV, 그렇지 않으면 movie
  const mediaType = movie.name && !movie.title ? 'tv' : 'movie';
  const detailUrl = `/detail/${movie.id}?type=${mediaType}`;

  return (
    <StyledMovieCard>
      <WatchListButtonWrapper>
        <WatchListButton movieId={movie.id} />
      </WatchListButtonWrapper>
      <Link to={detailUrl}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title || movie.name || "Movie"}
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
