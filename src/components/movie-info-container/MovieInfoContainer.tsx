import React from "react";
import { StyledMovieInfoContainer } from "./styles";
import { MovieInfo } from "@components/index";
import Movie from "@src/types/Movie";

interface MovieInfoContainerProps {
  movie: Movie;
}

const MovieInfoContainer = ({ movie }: MovieInfoContainerProps) => {
  return (
    <StyledMovieInfoContainer>
      <MovieInfo movie={movie} />
    </StyledMovieInfoContainer>
  );
};

export default MovieInfoContainer;
