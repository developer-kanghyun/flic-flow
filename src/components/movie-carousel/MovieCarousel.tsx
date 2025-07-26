import { useState, useRef } from "react";
import Movie from "@src/types/Movie";
import { MovieCard } from "@components/index";
import { 
  StyledCarousel, 
  CarouselHeader, 
  CarouselContent, 
  CarouselTrack,
  CarouselButton,
  MoreButton
} from "./styles";

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
}

const MovieCarousel = ({ movies, title }: MovieCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const itemWidth = 180; // 카드 너비 + 갭
  const visibleItems = 7; // 화면에 보이는 아이템 수
  const maxScroll = Math.max(0, (movies.length - visibleItems) * itemWidth);

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - itemWidth * 7);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  const scrollRight = () => {
    const newPosition = Math.min(maxScroll, scrollPosition + itemWidth * 7);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  if (movies.length === 0) return null;

  return (
    <StyledCarousel>
      <CarouselHeader>
        <h3>{title}</h3>
      </CarouselHeader>
      
      <CarouselContent>
        {scrollPosition > 0 && (
          <CarouselButton className="prev" onClick={scrollLeft}>
            ‹
          </CarouselButton>
        )}
        
        <CarouselTrack ref={trackRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="carousel-item">
              <MovieCard movie={movie} />
            </div>
          ))}
        </CarouselTrack>
        
        {scrollPosition < maxScroll && (
          <CarouselButton className="next" onClick={scrollRight}>
            ›
          </CarouselButton>
        )}
      </CarouselContent>
    </StyledCarousel>
  );
};

export default MovieCarousel;