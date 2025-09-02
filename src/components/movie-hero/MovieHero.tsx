import { memo } from "react";
import Movie from "@src/types/Movie";
import WatchListButton from "@src/components/watch-list-button/WatchListButton";
import VideoModal from "@src/components/video-modal/VideoModal";
import { getBackdropUrl } from "@src/utils/constants";
import { getMovieTitle, getReleaseYear } from "@src/utils/movieHelpers";
import { 
  HeroSection,
  HeroBackdrop,
  HeroOverlay,
  HeroContent,
  PlayButton 
} from "@pages/detail/styles";
import { OTT_SEARCH_URLS } from "@src/utils/constants";

interface MovieHeroProps {
  movie: Movie;
  hasTrailer: boolean;
  isVideoModalOpen: boolean;
  onPlayTrailer: () => void;
  onCloseModal: () => void;
  ratings?: {
    imdbRating?: string;
    rottenTomatoesRating?: string;
  };
  watchProviders?: any;
  director?: { name: string };
}

const MovieHero = memo(({ 
  movie, 
  hasTrailer, 
  isVideoModalOpen, 
  onPlayTrailer, 
  onCloseModal,
  ratings = {},
  watchProviders,
  director
}: MovieHeroProps) => {
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const title = getMovieTitle(movie);
  const releaseYear = getReleaseYear(movie);


  return (
    <>
      <HeroSection>
        {backdropUrl && (
          <HeroBackdrop 
            src={backdropUrl} 
            alt={title}
          />
        )}
        <HeroOverlay />
        {hasTrailer && (
          <PlayButton onClick={onPlayTrailer}>
            <button className="play-circle">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <span className="play-text">예고편 보기</span>
          </PlayButton>
        )}
        <HeroContent>
          <div className="hero-text">
            <h1>{title}</h1>
            <div className="hero-meta">
              <div className="watchlist-wrapper">
                <WatchListButton movieId={movie.id} />
              </div>
              <div className="imdb-rating">
                <span className="imdb-label">IMDB</span>
                <span className="rating-score">
                  {ratings.imdbRating || movie.vote_average?.toFixed(1) || '8.2'}
                </span>
              </div>
              <div className="rotten-tomatoes">
                <span className="rt-label">🍅</span>
                <span className="rt-score">
                  {ratings.rottenTomatoesRating || `${Math.round((movie.vote_average || 8.2) * 8.5)}%`}
                </span>
              </div>
              <span className="release-year">
                {releaseYear || '2024'}
              </span>
              {director && (
                <span className="director">감독: {director.name}</span>
              )}
            </div>
            <p className="overview">{movie.overview}</p>
            <div className="hero-actions">
              {watchProviders && watchProviders.flatrate && watchProviders.flatrate.length > 0 && (
                (() => {
                  // Netflix Standard with Ads 제외한 첫 번째 스트리밍 서비스
                  const streamingProviders = watchProviders.flatrate.filter(
                    (provider: any) => !provider.provider_name.includes('Standard with Ads')
                  );
                  
                  if (streamingProviders.length === 0) return null;
                  
                  const firstProvider = streamingProviders[0];
                  const ottSearchBaseUrl = OTT_SEARCH_URLS[firstProvider.provider_name];
                  const finalLink = ottSearchBaseUrl 
                    ? `${ottSearchBaseUrl}${encodeURIComponent(title || "")}`
                    : watchProviders.link;
                  
                  return (
                    <a 
                      href={finalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ott-logo-link"
                    >
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${firstProvider.logo_path}`}
                        alt={firstProvider.provider_name}
                        className="ott-logo"
                        loading="lazy"
                      />
                    </a>
                  );
                })()
              )}
            </div>
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