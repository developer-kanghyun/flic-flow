import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledSearchBar = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 40px;
  font-family: sans-serif;
  justify-content: center;
  height: 8vh;
  padding-right: 150px;
  width: 8vh;
`;

export const StyledSearchButton = styled(Link)`
  img {
    width: 30px;
    height: 30px;
  }
`;

export const StyledSearchInput = styled.input`
  height: 4vh;
  padding-right: 5px;
  margin-right: 10px;
`;
