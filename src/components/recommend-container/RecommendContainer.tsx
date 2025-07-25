import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Recommend } from "@components/index";
import { StyledRecommendContainer } from "./styles";

const RecommendContainer = () => {
  const recommendGenre = useMemo(() => {
    return ["신작", "인기", "예능", "드라마", "스포츠", "애니메이션"];
  }, []);

  return (
    <StyledRecommendContainer>
      {recommendGenre.map((genre) => (
        <Link key={genre} to={`/recommended/${genre}`}>
          <Recommend genre={genre} />
        </Link>
      ))}
    </StyledRecommendContainer>
  );
};

export default RecommendContainer;
