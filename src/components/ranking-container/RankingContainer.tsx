import React, { useMemo } from "react";
import { StyledRankingContainer } from "./styles";
import { RankingList } from "@components/index";
import { MovieWithGenre } from "@models/Movie";

const RankingContainer = () => {
  const moviesByGenre: MovieWithGenre[] = useMemo(() => {
    return [
      {
        type: "신작",
        movies: [
          { id: 1, title: "제목", thumbnail: "이미지경로" },
          { id: 2, title: "제목2", thumbnail: "이미지경로2" },
          { id: 3, title: "제목3", thumbnail: "이미지경로3" },
          { id: 4, title: "제목4", thumbnail: "이미지경로4" },
          { id: 5, title: "제목5", thumbnail: "이미지경로5" },
        ],
      },
    ];
  }, []);
  return (
    <StyledRankingContainer>
      {moviesByGenre.map((movieWithGenre: MovieWithGenre) => (
        <>
          <p>{movieWithGenre.type}</p>
          <RankingList movies={movieWithGenre.movies} />
        </>
      ))}
    </StyledRankingContainer>
  );
};

export default RankingContainer;
