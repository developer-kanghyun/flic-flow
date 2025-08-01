import { memo } from "react";
import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import { StyledRankedMovieCard, RankNumber, WatchListButtonWrapper } from "./styles";
import { getMediaType, getMovieTitle } from "@src/utils/movieHelpers";
import { getPosterUrl } from "@src/utils/constants";

interface RankedMovieCardProps {
  movie: Movie;
  rank: number;
}

const RankedMovieCard = memo(({ movie, rank }: RankedMovieCardProps) => {
  const mediaType = getMediaType(movie);
  const detailUrl = `/detail/${movie.id}?type=${mediaType}`;
  const title = getMovieTitle(movie) || "제목 없음";
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <StyledRankedMovieCard>
      <RankNumber>{rank}</RankNumber>
      <WatchListButtonWrapper>
        <WatchListButton movieId={movie.id} />
      </WatchListButtonWrapper>
      <Link to={detailUrl}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </Link>
    </StyledRankedMovieCard>
  );
});

RankedMovieCard.displayName = 'RankedMovieCard';

export default RankedMovieCard;