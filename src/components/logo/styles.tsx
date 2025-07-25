import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Link)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
