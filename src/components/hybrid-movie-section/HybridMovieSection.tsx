import { useEffect, useState } from "react";
import Movie from "@src/types/Movie";
import MovieCard from "@src/components/movie-card/MovieCard";
import MovieCarousel from "@src/components/movie-carousel/MovieCarousel";
import {
  StyledHybridSection,
  SectionHeader,
  FixedGrid,
  CarouselWrapper,
} from "./styles";

interface HybridMovieSectionProps {
  movies: Movie[];
  title: string;
}

const HybridMovieSection = ({ movies, title }: HybridMovieSectionProps) => {
  const [isMobile, setIsMobile] = useState(() => {
    // 초기값을 즉시 계산
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

  if (movies.length === 0) return null;

  const gridCount = isMobile ? 4 : 5;
  const firstMovies = movies.slice(0, gridCount);
  const remainingMovies = movies.slice(gridCount, 26);

  return (
    <StyledHybridSection>
      <SectionHeader>
        <h3>{title}</h3>
      </SectionHeader>

      {isMobile ? (
        // 모바일: 4개 고정 그리드 + 나머지 슬라이드
        <>
          <FixedGrid>
            {firstMovies.map((movie) => (
              <div key={movie.id} className="grid-item">
                <MovieCard movie={movie} />
              </div>
            ))}
          </FixedGrid>

          {remainingMovies.length > 0 && (
            <CarouselWrapper>
              <MovieCarousel movies={remainingMovies} title={`${title} 더보기`} />
            </CarouselWrapper>
          )}
        </>
      ) : (
        // 데스크톱/태블릿: 기존 방식 (고정 그리드 + 캐러셀)
        <>
          <FixedGrid>
            {firstMovies.map((movie) => (
              <div key={movie.id} className="grid-item">
                <MovieCard movie={movie} />
              </div>
            ))}
          </FixedGrid>

          {remainingMovies.length > 0 && (
            <CarouselWrapper>
              <MovieCarousel movies={remainingMovies} title={`${title} 더보기`} />
            </CarouselWrapper>
          )}
        </>
      )}
    </StyledHybridSection>
  );
};

export default HybridMovieSection;
