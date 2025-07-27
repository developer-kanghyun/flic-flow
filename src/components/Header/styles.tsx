import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 80px;

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

export const StyledServiceToggle = styled.button<{ isOpen: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
    padding: 6px 8px;
  }
`;

export const StyledAccordionContent = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  transition: all 0.3s ease;
  height: ${({ isOpen }) => isOpen ? 'auto' : '0'};
  max-height: ${({ isOpen }) => isOpen ? '300px' : '0'};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ isOpen }) => isOpen ? `1px solid ${({ theme }) => theme.colors.border}` : 'none'};
  
  ${({ isOpen }) => isOpen && `
    padding: 20px;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ isOpen }) => isOpen && `
      padding: 16px;
    `}
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
