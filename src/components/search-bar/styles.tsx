import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
  }
`;

export const StyledSearchInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 5px;
  background-color: #1B1A17;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1em;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 0.9em;
  }
`;

export const StyledSearchButton = styled(Link)`
  margin-left: 10px;
  padding: 8px 12px;
  background-color: transparent; /* 배경색 투명으로 변경 */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    filter: invert(100%); /* Make magnifier icon white for dark background */
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey}; /* 호버 시 배경색 변경 */
  }

  @media (max-width: 768px) {
    margin-left: 8px;
    padding: 6px 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

