import { styled } from "styled-components";

export const StyledRanking = styled.div`
  align-items: center;
  border: 2px solid darkgray;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 30px;
  font-family: sans-serif;
  justify-content: center;
  height: 48.5vh;
  margin: 10px;
  padding: 65px;
  position: relative;

  div {
    position: absolute;
    right: 5%;
    bottom: 5%;

    img {
      height: 35px;
      width: 35px;
      cursor: pointer;
    }
  }
`;
