import { styled } from "styled-components";

export const StyledFilter = styled.button<{ active: string | undefined }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm}; // Consistent padding
  border-radius: 8px; // Slightly rounded corners for the box
  cursor: pointer;
  background-color: ${({ theme, active }) =>
    active ? 'transparent' : theme.colors.surface}; // Active: transparent, Inactive: surface
  border: 1px solid; // Border will be dynamic
  border-color: ${({ active }) =>
    active ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 215, 0, 0.1)'}; // Active: neon, Inactive: subtle neon
  transition: all 0.3s ease;
  min-width: 100px; // Minimum width
  min-height: 100px; // Minimum height
  box-sizing: border-box; // Ensure padding is included in width/height
  box-shadow: ${({ active }) =>
    active ? '0 0 15px rgba(255, 215, 0, 0.6)' : '0 0 5px rgba(255, 215, 0, 0.1)'}; // Active: strong neon, Inactive: subtle neon glow

  img {
    width: 50px;
    height: 50px;
    margin-bottom: ${({ theme }) => theme.spacing.xxs}; // Smaller margin
    border-radius: 8px; // Square logo
    object-fit: cover;
    transition: all 0.3s ease;
    ${({ active }) => !active && `
      filter: brightness(0.4); // Darker, but retains color
    `}
  }

  span {
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.2;
    z-index: 1;
    color: ${({ theme, active }) =>
      active ? theme.colors.text : `rgba(255, 255, 255, 0.6)`}; // Active: text, Inactive: dimmed white
    transition: color 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ active }) =>
      active ? '0 0 20px rgba(255, 215, 0, 0.8)' : '0 0 10px rgba(255, 215, 0, 0.4)'}; // Hover: stronger neon glow
    border-color: ${({ active }) =>
      active ? 'rgba(255, 215, 0, 1)' : 'rgba(255, 215, 0, 0.6)'}; // Hover: brighter neon
    background-color: ${({ active }) =>
      active ? 'rgba(255, 215, 0, 0.1)' : `rgba(255, 255, 255, 0.1)`}; // Active: subtle neon background, Inactive: slightly brighter than surface
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    min-width: 80px;
    min-height: 80px;
    padding: ${({ theme }) => theme.spacing.xs};
    
    img {
      width: 40px;
      height: 40px;
    }
    
    span {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    min-width: 70px;
    min-height: 70px;
    padding: ${({ theme }) => theme.spacing.xxs};
    
    img {
      width: 35px;
      height: 35px;
    }
    
    span {
      font-size: 0.8rem;
    }
  }
`;
