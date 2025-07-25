import { styled } from "styled-components";
import { LOGO_COLOR } from "@consts/colors";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Link)`
  align-items: center;
  box-sizing: border-box;
  color: ${LOGO_COLOR};
  font-family: sans-serif;
  font-size: 2.5rem;
  font-weight: bolder;
  justify-content: center;
  width: 30vw;
`;
