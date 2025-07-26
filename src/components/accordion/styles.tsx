import { styled } from "styled-components";

export const StyledAccordion = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 90;
  background: ${({ theme }) => theme.colors.surface};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledAccordionHeader = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: transparent;
  color: ${({ theme, isOpen }) => isOpen ? theme.colors.primary : theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 60px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: 14px;
    height: 50px;
  }
`;

export const StyledAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  background: ${({ theme }) => theme.colors.surface};
`;

export const StyledButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  img {
    width: 16px;
    height: 16px;
    filter: invert(80%);
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const StyledContents = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  }
`;
