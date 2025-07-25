import React from "react";
import { StyledBody, StyledMainTopArea } from "./styles";
import {
  FilterContainer,
  RankingContainer,
  RecommendContainer,
} from "@components/index";

const Main = () => {
  return (
    <>
      <StyledBody>
        {/*<StyledFilterContainer>*/}

        {/*</StyledFilterContainer>*/}

        <StyledMainTopArea>
          <FilterContainer /> {/*{클릭시 모달?}*/}
          <RecommendContainer />
        </StyledMainTopArea>

        <RankingContainer />
      </StyledBody>
    </>
  );
};

export default Main;
