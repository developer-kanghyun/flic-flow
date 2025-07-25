import { styled } from "styled-components";
import { BACKGROUND_COLOR } from "@consts/colors";

export const StyledSearchResult = styled.div`
  font-size: 35px;
  padding-left: 20px;
  padding-top: 20px;
`;

export const StyledSearched = styled.div`
  background-color: ${BACKGROUND_COLOR};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 20px;
  font-family: sans-serif;
  padding-left: 40px;
  padding-top: 40px;
`;
