import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import {
  StyledHeroBanner,
  HeroContent,
  HeroInfo,
  HeroTitle,
  HeroOverview,
  HeroActions,
  PlayButton,
  HeroBackground
} from "./styles";

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  }, [movie.backdrop_path]);

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
          <HeroOverview>
            {movie.overview ? (
              movie.overview.length > 200 
                ? `${movie.overview.substring(0, 200)}...`
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