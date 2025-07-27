import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(135deg, 
    rgba(15, 15, 15, 0.98) 0%,
    rgba(25, 25, 25, 0.95) 50%,
    rgba(15, 15, 15, 0.98) 100%
  );
  backdrop-filter: blur(12px) saturate(150%);
  border-bottom: 1px solid rgba(255, 133, 0, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
  color: ${({ theme, isOpen }) => isOpen 
    ? theme.colors.primary 
    : theme.colors.text
  };
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
    font-size: 14px;
    padding: 6px 8px;
  }
`;

export const StyledAccordionContent = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  max-height: ${({ isOpen }) => isOpen ? '300px' : '0'};
  background: linear-gradient(180deg, 
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.95) 100%
  );
  border-bottom: ${({ isOpen }) => isOpen ? '1px solid rgba(255, 133, 0, 0.2)' : 'none'};
  box-shadow: ${({ isOpen }) => isOpen ? 'inset 0 4px 8px rgba(0, 0, 0, 0.3)' : 'none'};
  padding: ${({ isOpen }) => isOpen ? '24px' : '0 24px'};
  border-top: ${({ isOpen }) => isOpen ? '1px solid rgba(255, 133, 0, 0.1)' : 'none'};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ isOpen }) => isOpen ? '20px' : '0 20px'};
  }
`;

export const StyledWatchListIcon = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 36px;
  background: linear-gradient(135deg, 
    rgba(255, 133, 0, 0.1) 0%, 
    rgba(255, 183, 0, 0.05) 100%
  );
  border: 1px solid rgba(255, 133, 0, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent
    );
    transition: left 0.5s ease;
  }

  img {
    width: 20px;
    height: 20px;
    filter: brightness(0) saturate(100%) invert(50%) sepia(95%) saturate(1747%) hue-rotate(15deg) brightness(103%) contrast(101%);
    transition: all 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, 
      rgba(255, 133, 0, 0.2) 0%, 
      rgba(255, 183, 0, 0.1) 100%
    );
    border-color: rgba(255, 133, 0, 0.4);
    box-shadow: 0 2px 8px rgba(255, 133, 0, 0.2);
    transform: translateY(-1px);
    
    img {
      filter: brightness(0) saturate(100%) invert(60%) sepia(100%) saturate(2000%) hue-rotate(15deg) brightness(110%) contrast(105%);
      transform: scale(1.1);
    }

    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 38px;
    height: 32px;
    
    img {
      width: 18px;
      height: 18px;
    }
  }
`;
