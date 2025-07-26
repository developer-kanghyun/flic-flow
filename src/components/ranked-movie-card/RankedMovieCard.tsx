import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import { StyledRankedMovieCard, RankNumber, WatchListButtonWrapper } from "./styles";

interface RankedMovieCardProps {
  movie: Movie;
  rank: number;
}

const RankedMovieCard = ({ movie, rank }: RankedMovieCardProps) => {
  return (
    <StyledRankedMovieCard>
      <RankNumber>{rank}</RankNumber>
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
    </StyledRankedMovieCard>
  );
};

export default RankedMovieCard;