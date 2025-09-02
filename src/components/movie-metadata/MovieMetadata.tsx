import { memo } from "react";
import Movie from "@src/types/Movie";
import type { WatchProviderDetails } from "@src/types/api";
import { OTT_SEARCH_URLS } from "@src/api/tmdbApi";
import { MetadataCard } from "./styles";

interface MovieMetadataProps {
  movie: Movie;
  ratings: {
    imdbRating: string | null;
    rottenTomatoesRating: string | null;
  };
  watchProviders: WatchProviderDetails | null;
}

const MovieMetadata = memo(({ movie, ratings, watchProviders }: MovieMetadataProps) => {
  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MetadataCard>
      <h3>상세 정보</h3>
      
      <div className="metadata-item">
        <span className="label">평점:</span>
        <div className="ratings">
          <span className="tmdb-rating">
            TMDB: {movie.vote_average?.toFixed(1)}/10
          </span>
          {ratings.imdbRating && (
            <span className="imdb-rating">
              IMDB: {ratings.imdbRating}/10
            </span>
          )}
          {ratings.rottenTomatoesRating && (
            <span className="rt-rating">
              RT: {ratings.rottenTomatoesRating}
            </span>
          )}
        </div>
      </div>

      {movie.runtime && (
        <div className="metadata-item">
          <span className="label">상영시간:</span>
          <span className="value">{formatRuntime(movie.runtime)}</span>
        </div>
      )}

      {(movie.release_date || movie.first_air_date) && (
        <div className="metadata-item">
          <span className="label">개봉일:</span>
          <span className="value">
            {formatDate(movie.release_date || movie.first_air_date!)}
          </span>
        </div>
      )}

      {movie.genres && movie.genres.length > 0 && (
        <div className="metadata-item">
          <span className="label">장르:</span>
          <div className="genres">
            {movie.genres.map((genre, index) => (
              <span key={genre.id} className="genre">
                {genre.name}
                {index < movie.genres!.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      )}

      {movie.production_countries && movie.production_countries.length > 0 && (
        <div className="metadata-item">
          <span className="label">제작국가:</span>
          <span className="value">
            {movie.production_countries.map(country => country.name).join(", ")}
          </span>
        </div>
      )}

      {watchProviders && (
        <div className="metadata-item">
          <span className="label">시청 가능한 곳:</span>
          <div className="watch-providers">
            {watchProviders.flatrate && watchProviders.flatrate.map(provider => (
              <a
                key={provider.provider_id}
                href={`${OTT_SEARCH_URLS[provider.provider_name] || '#'}${encodeURIComponent(movie.title || movie.name || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="provider-link"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="provider-logo"
                  loading="lazy"
                />
                <span>{provider.provider_name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </MetadataCard>
  );
});

MovieMetadata.displayName = 'MovieMetadata';

export default MovieMetadata;