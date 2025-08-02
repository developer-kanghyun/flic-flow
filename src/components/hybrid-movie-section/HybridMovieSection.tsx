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
  if (movies.length === 0) return null;

  const firstFiveMovies = movies.slice(0, 5);
  const remainingMovies = movies.slice(5, 26); // 5개 이후 21개만 표시

  return (
    <StyledHybridSection>
      <SectionHeader>
        <h3>{title}</h3>
      </SectionHeader>

      {/* 첫 5개는 고정 그리드 */}
      <FixedGrid>
        {firstFiveMovies.map((movie) => (
          <div key={movie.id} className="grid-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </FixedGrid>

      {/* 나머지는 캐러셀 */}
      {remainingMovies.length > 0 && (
        <CarouselWrapper>
          <MovieCarousel movies={remainingMovies} title={`${title} 더보기`} />
        </CarouselWrapper>
      )}
    </StyledHybridSection>
  );
};

export default HybridMovieSection;
