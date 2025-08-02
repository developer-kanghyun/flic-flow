import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, 
    rgba(25, 25, 25, 0.8) 0%, 
    rgba(35, 35, 35, 0.6) 100%
  );
  border: 1px solid rgba(255, 133, 0, 0.2);
  border-radius: 8px;
  height: 38px;
  width: 300px;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:focus-within {
    border-color: rgba(255, 133, 0, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 133, 0, 0.1);
    background: linear-gradient(135deg, 
      rgba(30, 30, 30, 0.9) 0%, 
      rgba(40, 40, 40, 0.7) 100%
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 200px;
    height: 36px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 140px;
    height: 32px;
  }
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  padding: 0 16px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  outline: none;
  font-weight: 400;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 14px;
    font-size: 13px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 12px;
    font-size: 13px;
  }
`;

export const StyledSearchButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    #ff8500 100%
  );
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.5s ease;
  }

  img {
    width: 16px;
    height: 16px;
    filter: invert(1);
    transition: transform 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, 
      #ff8500 0%, 
      ${({ theme }) => theme.colors.primary} 100%
    );
    box-shadow: 0 2px 8px rgba(255, 133, 0, 0.4);

    img {
      transform: scale(1.1);
    }

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 36px;
    height: 36px;
    
    img {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    
    img {
      width: 13px;
      height: 13px;
    }
  }
`;

