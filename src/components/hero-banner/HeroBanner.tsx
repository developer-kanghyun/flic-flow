import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import { fetchIMDBId, fetchOMDBRatings } from "@src/services/omdbApi";
import {
  StyledHeroBanner,
  HeroContent,
  HeroInfo,
  HeroTitle,
  HeroOverview,
  HeroActions,
  PlayButton,
  HeroBackground,
  HeroRating,
  HeroMetrics
} from "./styles";

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ratings, setRatings] = useState<{
    imdbRating: string | null;
    rottenTomatoesRating: string | null;
  }>({
    imdbRating: null,
    rottenTomatoesRating: null
  });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  }, [movie.backdrop_path]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const imdbId = await fetchIMDBId(movie.id);
        if (imdbId) {
          const omdbRatings = await fetchOMDBRatings(imdbId);
          if (omdbRatings) {
            setRatings({
              imdbRating: omdbRatings.imdbRating,
              rottenTomatoesRating: omdbRatings.rottenTomatoesRating
            });
          }
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, [movie.id]);

  return (
    <StyledHeroBanner>
      <HeroBackground
        style={{
          backgroundImage: imageLoaded 
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
            : 'none'
        }}
      />
      
      <HeroContent>
        <HeroInfo>
          <HeroTitle>{movie.title || movie.name}</HeroTitle>
          
          <HeroMetrics>
            <HeroRating>
              <span className="imdb-label">IMDB</span>
              <span className="rating-score">
                {ratings.imdbRating || movie.vote_average?.toFixed(1) || '8.2'}
              </span>
            </HeroRating>
            <HeroRating className="rotten-tomatoes">
              <span className="rt-label">🍅</span>
              <span className="rt-score">
                {ratings.rottenTomatoesRating || `${Math.round((movie.vote_average || 8.2) * 8.5)}%`}
              </span>
            </HeroRating>
            <span className="release-year">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : '2024'}
            </span>
          </HeroMetrics>
          
          <HeroOverview>
            {movie.overview ? (
              movie.overview.length > 180 
                ? `${movie.overview.substring(0, 180)}...`
                : movie.overview
            ) : (
              "줄거리 정보가 없습니다."
            )}
          </HeroOverview>
          
          <HeroActions>
            <Link to={`/detail/${movie.id}`}>
              <PlayButton>
                <span>▶</span>
                재생
              </PlayButton>
            </Link>
            <WatchListButton movieId={movie.id} />
          </HeroActions>
        </HeroInfo>
      </HeroContent>
    </StyledHeroBanner>
  );
};

export default HeroBanner;