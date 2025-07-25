import { styled } from "styled-components";
import { BACKGROUND_COLOR } from "@consts/colors";

export const StyledBody = styled.div`
  background-color: ${BACKGROUND_COLOR};
  font-size: 15px;
  font-family: sans-serif;
  height: 83vh;
`;

export const StyledMovieBoxWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
