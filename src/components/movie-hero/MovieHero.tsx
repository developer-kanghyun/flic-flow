import { memo } from "react";
import Movie from "@src/types/Movie";
import { WatchListButton, VideoModal } from "@components/index";
import { 
  HeroSection,
  HeroBackdrop,
  HeroOverlay,
  HeroContent,
  PlayButton 
} from "./styles";

interface MovieHeroProps {
  movie: Movie;
  hasTrailer: boolean;
  isVideoModalOpen: boolean;
  onPlayTrailer: () => void;
  onCloseModal: () => void;
}

const MovieHero = memo(({ 
  movie, 
  hasTrailer, 
  isVideoModalOpen, 
  onPlayTrailer, 
  onCloseModal 
}: MovieHeroProps) => {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
    ? new Date(movie.first_air_date).getFullYear()
    : null;

  return (
    <>
      <HeroSection>
        {backdropUrl && (
          <HeroBackdrop>
            <img src={backdropUrl} alt={movie.title || movie.name} />
            <HeroOverlay />
          </HeroBackdrop>
        )}
        
        <HeroContent>
          <div className="hero-info">
            <h1>{movie.title || movie.name}</h1>
            {releaseYear && <span className="year">({releaseYear})</span>}
            
            <div className="hero-actions">
              {hasTrailer && (
                <PlayButton onClick={onPlayTrailer}>
                  ▶ 예고편 보기
                </PlayButton>
              )}
              <WatchListButton movieId={movie.id} />
            </div>
            
            {movie.overview && (
              <p className="overview">{movie.overview}</p>
            )}
          </div>
        </HeroContent>
      </HeroSection>

      {isVideoModalOpen && (
        <VideoModal
          isOpen={true}
          movieId={movie.id}
          movie={movie}
          onClose={onCloseModal}
        />
      )}
    </>
  );
});

MovieHero.displayName = 'MovieHero';

export default MovieHero;