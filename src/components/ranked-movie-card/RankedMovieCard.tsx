import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import { StyledRankedMovieCard, RankNumber, WatchListButtonWrapper } from "./styles";

interface RankedMovieCardProps {
  movie: Movie;
  rank: number;
}

const RankedMovieCard = ({ movie, rank }: RankedMovieCardProps) => {
  const mediaType = movie.name && !movie.title ? 'tv' : 'movie';
  const detailUrl = `/detail/${movie.id}?type=${mediaType}`;
  const title = movie.title || movie.name || "제목 없음";

  return (
    <StyledRankedMovieCard>
      <RankNumber>{rank}</RankNumber>
      <WatchListButtonWrapper>
        <WatchListButton movieId={movie.id} />
      </WatchListButtonWrapper>
      <Link to={detailUrl}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </Link>
    </StyledRankedMovieCard>
  );
};

export default RankedMovieCard;