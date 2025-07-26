import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Link)`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`;
