import { styled } from "styled-components";
import { HEADER_COLOR } from "@consts/colors";

export const StyledHeader = styled.div`
  display: flex;
  background-color: ${HEADER_COLOR};
  box-sizing: border-box;
  font-family: sans-serif;
  height: 8vh;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;

  div {
    display: flex;
  }
`;

// export const
