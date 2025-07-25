import React from "react";
import { StyledOttLinkContainer } from "./styles";
import { OttLink } from "@components/index";

const OttLinkContainer = () => {
  return (
    <StyledOttLinkContainer>
      <h2>시청하기</h2>
      <OttLink />
    </StyledOttLinkContainer>
  );
};

export default OttLinkContainer;
