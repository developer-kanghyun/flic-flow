import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledWatchList = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 40px;
  font-family: sans-serif;
  justify-content: center;
  padding-right: 10px;
`;

export const StyledWatchListButton = styled(Link)`
  img {
    height: 30px;
    width: 30px;
  }
`;
