import React from "react";
import { Ranking } from "@components/index";
import { StyledRankingList } from "./styles";
import { Movie } from "../../models/Movie";

interface ListProps {
  movies: Movie[];
}

const RankingList = (props: ListProps) => {
  const { movies } = props;

  return (
    <StyledRankingList>
      {movies.map((movie: Movie) => (
        <Ranking movie={movie} />
      ))}
    </StyledRankingList>
  );
};

export default RankingList;
