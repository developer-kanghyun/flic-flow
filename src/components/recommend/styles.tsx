import { styled } from "styled-components";
import { LOGO_COLOR } from "@consts/colors";
import { Link } from "react-router-dom";

export const StyledRecommend = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: inline;
  color: ${LOGO_COLOR};
  font-size: 30px;
  font-family: sans-serif;
  justify-content: center;
  height: 8vh;
  width: 8vh;
  text-decoration: none;
`;
