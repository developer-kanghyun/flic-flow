import Movie from "@src/types/Movie";
import RankedMovieCard from "@src/components/ranked-movie-card/RankedMovieCard";
import { StyledTopFiveList, TopFiveGrid } from "./styles";

interface TopFiveListProps {
  movies: Movie[];
  title: string;
}

const TopFiveList = ({ movies, title }: TopFiveListProps) => {
  // 상위 5개만 표시
  const topFiveMovies = movies.slice(0, 5);

  return (
    <StyledTopFiveList>
      <h2>{title}</h2>
      <TopFiveGrid>
        {topFiveMovies.map((movie, index) => (
          <RankedMovieCard 
            key={movie.id} 
            movie={movie} 
            rank={index + 1}
          />
        ))}
      </TopFiveGrid>
    </StyledTopFiveList>
  );
};

export default TopFiveList;