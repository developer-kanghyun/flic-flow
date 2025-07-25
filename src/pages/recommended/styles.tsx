import { styled } from "styled-components";
import { BACKGROUND_COLOR } from "@consts/colors";

export const StyledBody = styled.div`
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  flex-wrap: wrap;
  font-size: 12px;
  font-family: sans-serif;
  height: 100vh;
  width: 100%;
`;
export const StyledRecommendResult = styled.div`
  font-size: 35px;
  padding-left: 20px;
  padding-top: 20px;
`;
export const StyledRecommended = styled.div`
  background-color: ${BACKGROUND_COLOR};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 50px;
  padding-left: 40px;
  padding-top: 40px;
`;
