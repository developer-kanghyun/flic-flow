import React from "react";
import { StyledMoviePlayerContainer } from "./styles";
import { MoviePlayer } from "@components/index";

const MoviePlayerContainer = () => {
  return (
    <StyledMoviePlayerContainer>
      <div>영화그림</div>
      <MoviePlayer />
    </StyledMoviePlayerContainer>
  );
};

export default MoviePlayerContainer;
