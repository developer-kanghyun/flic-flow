import { StyledRankingList } from "./styles";
import Movie from "@src/types/Movie";

interface ListProps {
  movies: Movie[];
}

const RankingList = (props: ListProps) => {
  const { movies } = props;

  return (
    <StyledRankingList>
      {movies.map((movie: Movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </StyledRankingList>
  );
};

export default RankingList;
