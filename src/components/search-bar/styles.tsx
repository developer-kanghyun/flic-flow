import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  height: 32px;
  width: 280px;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 220px;
    height: 28px;
  }
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  padding: 0 12px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 10px;
    font-size: 12px;
  }
`;

export const StyledSearchButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  img {
    width: 14px;
    height: 14px;
    filter: invert(1);
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 28px;
    height: 28px;
    
    img {
      width: 12px;
      height: 12px;
    }
  }
`;

