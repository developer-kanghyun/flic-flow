import React from "react";
import { Link } from "react-router-dom";
import Movie from "@src/types/Movie";
import { WatchListButton } from "@components/index";
import { StyledMovieList } from "./styles";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <StyledMovieList>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/detail/${movie.id}`}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', color: '#fff' }}>No Image</div>
            )}
          </Link>
          <WatchListButton movieId={movie.id} />
        </li>
      ))}
    </StyledMovieList>
  );
};

export default MovieList;
