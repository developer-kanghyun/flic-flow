import { useEffect, useState } from "react";
import Movie from "@src/types/Movie";
import RankedMovieCard from "@src/components/ranked-movie-card/RankedMovieCard";
import { StyledTopFiveList, TopFiveGrid } from "./styles";

interface TopFiveListProps {
  movies: Movie[];
  title: string;
}

const TopFiveList = ({ movies, title }: TopFiveListProps) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 430;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일: 4개, 데스크톱/태블릿: 5개
  const topMovies = movies.slice(0, isMobile ? 4 : 5);

  return (
    <StyledTopFiveList>
      <h2>{title}</h2>
      <TopFiveGrid>
        {topMovies.map((movie, index) => (
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