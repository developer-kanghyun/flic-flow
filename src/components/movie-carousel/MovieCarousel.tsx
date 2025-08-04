import { useState, useRef, useCallback, useMemo, memo, useEffect } from "react";
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
  MOBILE: { width: 130, visibleItems: 4 },
  TABLET: { width: 156, visibleItems: 3 },
  DESKTOP: { width: 196, visibleItems: 3 },
} as const;

const MovieCarousel = memo(({ movies, title }: MovieCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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
    const newPosition = Math.max(0, scrollPosition - itemWidth);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [scrollPosition, itemWidth]);

  const scrollRight = useCallback(() => {
    const newPosition = Math.min(maxScroll, scrollPosition + itemWidth);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [scrollPosition, maxScroll, itemWidth]);

  // 터치/스와이프 기능
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && scrollPosition < maxScroll) {
      scrollRight();
    }
    if (isRightSwipe && scrollPosition > 0) {
      scrollLeft();
    }
  };

  if (movies.length === 0) return null;

  return (
    <StyledCarousel>
      <CarouselHeader>
        <h3>{title}</h3>
      </CarouselHeader>
      
      <CarouselContent
        ref={contentRef}
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchMove={isMobile ? onTouchMove : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
      >
        {!isMobile && scrollPosition > 0 && (
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
        
        {!isMobile && scrollPosition < maxScroll && (
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