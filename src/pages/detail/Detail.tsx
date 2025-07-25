import React from "react";
import { StyledBody, StyledMovieBoxWrapper } from "./styles";
import { MovieInfo, MoviePlayer } from "@components/index";
import { StyledMoviePlayerContainer } from "@components/movie-player-container/styles";
import { StyledMovieInfoContainer } from "@components/movie-info-container/styles";
import { StyledOttLinkContainer } from "@components/ott-link-container/styles";
import OttLink from "@components/ott-link/OttLink";

const Detail = () => {
  return (
    <>
      <StyledBody>
        <StyledMovieBoxWrapper>
          <StyledMoviePlayerContainer>
            <MoviePlayer />
          </StyledMoviePlayerContainer>
          <StyledMovieInfoContainer>
            <MovieInfo />
            {/*</StyledMovieInfo>*/}
            {/*  영화 정보(포스터, 제목, 개봉년도, IDMB, tomato, 줄거리, 출연정보 / 찜*/}
            {/*  누르면 watchlist에 저장됨)*/}
          </StyledMovieInfoContainer>
        </StyledMovieBoxWrapper>

        <StyledOttLinkContainer>
          <h2>시청하기</h2>
          <OttLink />
        </StyledOttLinkContainer>

        {/*<DirectorInfo>감독의 다른 작품</DirectorInfo>*/}
      </StyledBody>
    </>
  );
};

export default Detail;
