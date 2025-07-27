import { useState, useRef, useCallback, useMemo, memo } from "react";
import Movie from "@src/types/Movie";
import { MovieCard } from "@components/index";
import { 
  StyledCarousel, 
  CarouselHeader, 
  CarouselContent, 
  CarouselTrack,
  CarouselButton
} from "./styles";

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
}

const CAROUSEL_CONFIG = {
  MOBILE: { width: 146, visibleItems: 5 },
  TABLET: { width: 171, visibleItems: 7 },
  DESKTOP: { width: 196, visibleItems: 7 },
} as const;

const MovieCarousel = memo(({ movies, title }: MovieCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const { itemWidth, visibleItems, maxScroll } = useMemo(() => {
    const getConfig = () => {
      if (window.innerWidth <= 480) return CAROUSEL_CONFIG.MOBILE;
      if (window.innerWidth <= 768) return CAROUSEL_CONFIG.TABLET;
      return CAROUSEL_CONFIG.DESKTOP;
    };
    
    const config = getConfig();
    return {
      itemWidth: config.width,
      visibleItems: config.visibleItems,
      maxScroll: Math.max(0, (movies.length - config.visibleItems) * config.width),
    };
  }, [movies.length]);

  const scrollLeft = useCallback(() => {
    const newPosition = Math.max(0, scrollPosition - itemWidth * visibleItems);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [scrollPosition, itemWidth, visibleItems]);

  const scrollRight = useCallback(() => {
    const newPosition = Math.min(maxScroll, scrollPosition + itemWidth * visibleItems);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [scrollPosition, maxScroll, itemWidth, visibleItems]);

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
});

MovieCarousel.displayName = 'MovieCarousel';

export default MovieCarousel;