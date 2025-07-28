import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import WatchListButton from "@src/components/watch-list-button/WatchListButton";
import { 
  StyledRankedMovieList, 
  StyledTopRanked, 
  StyledRankedItem, 
  StyledRankNumber,
  StyledCarouselSection
} from "./styles";

interface RankedMovieListProps {
  movies: Movie[];
  title?: string;
}

const RankedMovieList = ({ movies, title }: RankedMovieListProps) => {
  if (movies.length === 0) return null;

  const topMovies = movies.slice(0, 5);
  const carouselMovies = movies.slice(5);

  return (
    <StyledRankedMovieList>
      {title && <h2>{title}</h2>}
      
      <StyledTopRanked>
        {topMovies.map((movie, index) => (
          <StyledRankedItem key={movie.id}>
            <StyledRankNumber>{index + 1}</StyledRankNumber>
            <Link to={`/detail/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </Link>
            <WatchListButton movieId={movie.id} />
          </StyledRankedItem>
        ))}
      </StyledTopRanked>

      {carouselMovies.length > 0 && (
        <StyledCarouselSection>
          <h3>더 많은 콘텐츠</h3>
          <div className="carousel-container">
            {carouselMovies.map((movie) => (
              <div key={movie.id} className="carousel-item">
                <Link to={`/detail/${movie.id}`}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </Link>
                <WatchListButton movieId={movie.id} />
              </div>
            ))}
          </div>
        </StyledCarouselSection>
      )}
    </StyledRankedMovieList>
  );
};

export default RankedMovieList;