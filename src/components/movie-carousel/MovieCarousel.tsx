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
  TABLET: { width: 156, visibleItems: 5 },
  DESKTOP: { width: 196, visibleItems: 7 },
} as const;

const MovieCarousel = memo(({ movies, title }: MovieCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 430;
    }
    return false;
  });
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
  
  const { itemWidth, maxScroll } = useMemo(() => {
    const getConfig = () => {
      if (window.innerWidth <= 480) return CAROUSEL_CONFIG.MOBILE;
      if (window.innerWidth <= 768) return CAROUSEL_CONFIG.TABLET;
      return CAROUSEL_CONFIG.DESKTOP;
    };
    
    const config = getConfig();
    const scrollWidth = config.width + 16; // item width + gap
    // 모바일에서는 전체 영화를 다 볼 수 있도록 maxScroll 계산
    const effectiveVisibleItems = window.innerWidth <= 430 ? 1 : config.visibleItems;
    return {
      itemWidth: config.width,
      maxScroll: Math.max(0, (movies.length - effectiveVisibleItems) * scrollWidth),
    };
  }, [movies.length]);

  const scrollLeft = useCallback(() => {
    const config = (() => {
      if (window.innerWidth <= 480) return CAROUSEL_CONFIG.MOBILE;
      if (window.innerWidth <= 768) return CAROUSEL_CONFIG.TABLET;
      return CAROUSEL_CONFIG.DESKTOP;
    })();
    
    const scrollWidth = itemWidth + 16; // item width + gap
    const scrollAmount = scrollWidth * config.visibleItems;
    const newPosition = Math.max(0, scrollPosition - scrollAmount);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [scrollPosition, itemWidth]);

  const scrollRight = useCallback(() => {
    const config = (() => {
      if (window.innerWidth <= 480) return CAROUSEL_CONFIG.MOBILE;
      if (window.innerWidth <= 768) return CAROUSEL_CONFIG.TABLET;
      return CAROUSEL_CONFIG.DESKTOP;
    })();
    
    const scrollWidth = itemWidth + 16; // item width + gap
    const scrollAmount = scrollWidth * config.visibleItems;
    const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [scrollPosition, maxScroll, itemWidth]);

  // 터치/드래그 기능
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [initialScrollPosition, setInitialScrollPosition] = useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.targetTouches[0].clientX);
    setInitialScrollPosition(scrollPosition);
    // transition 비활성화 (드래그 중에는 즉시 반응)
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || dragStart === null) return;
    
    const currentX = e.targetTouches[0].clientX;
    const deltaX = dragStart - currentX; // 드래그한 거리
    // 드래그 감도를 1.5배로 적절하게 조정
    const amplifiedDelta = deltaX * 1.5;
    const newPosition = Math.max(0, Math.min(maxScroll, initialScrollPosition + amplifiedDelta));
    
    setScrollPosition(newPosition);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    setDragStart(null);
    // transition 다시 활성화
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
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