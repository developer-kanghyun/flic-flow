import { styled } from "styled-components";
import { BACKGROUND_COLOR } from "@consts/colors";

export const StyledBody = styled.div`
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  //display: flex;
  //flex-direction: row;
  flex-wrap: wrap;
  font-size: 12px;
  font-family: sans-serif;
  height: 100vh;
  width: 100%;
`;

export const StyledFilterContainer = styled.div`
  border: 2px solid orange;
  width: 40%;
  margin: 20px;
`;

export const StyledMainTopArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  div {
    width: 50%;
  }
`;

export const Recommend = styled.div`
  border: 1px solid purple;
  font-size: 200%;
  height: 20%;
  width: 30%;
`;

export const Ranking = styled.div`
  border: 1px solid purple;
  width: 10%;
`;
