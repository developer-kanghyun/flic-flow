import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 80px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  .header-left {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    height: 56px;

    .header-left {
      gap: ${({ theme }) => theme.spacing.md};
    }

    .header-right {
      gap: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

export const StyledWatchListIcon = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
  transition: all 0.2s ease;

  img {
    width: 18px;
    height: 18px;
    filter: invert(1);
    opacity: 0.8;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
    
    img {
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 36px;
    height: 28px;
    
    img {
      width: 16px;
      height: 16px;
    }
  }
`;
