import React from "react";
import { StyledMovieInfoContainer } from "./styles";
import { MovieInfo } from "@components/index";

const MovieInfoContainer = () => {
  return (
    <StyledMovieInfoContainer>
      <MovieInfo />
    </StyledMovieInfoContainer>
  );
};

export default MovieInfoContainer;
