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
  
  // 반응형 아이템 너비와 보이는 아이템 수
  const getItemWidth = () => {
    if (window.innerWidth <= 480) return 146; // 모바일: 130px + 16px gap
    if (window.innerWidth <= 768) return 171; // 태블릿: 155px + 16px gap  
    return 196; // 데스크톱: 180px + 16px gap
  };
  
  const getVisibleItems = () => {
    if (window.innerWidth <= 480) return 5; // 모바일에서 5개
    return 7; // 데스크톱/태블릿에서 7개
  };
  
  const itemWidth = getItemWidth();
  const visibleItems = getVisibleItems();
  const maxScroll = Math.max(0, (movies.length - visibleItems) * itemWidth);

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - itemWidth * visibleItems);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  const scrollRight = () => {
    const newPosition = Math.min(maxScroll, scrollPosition + itemWidth * visibleItems);
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