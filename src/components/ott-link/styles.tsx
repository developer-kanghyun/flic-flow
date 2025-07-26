import { styled } from "styled-components";

export const StyledOttLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  font-weight: 600;
  padding: 16px 12px;
  background: 
    linear-gradient(145deg, 
      rgba(28, 28, 28, 0.9) 0%, 
      rgba(20, 20, 20, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 140, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  min-width: 90px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 140, 0, 0.1), 
      transparent
    );
    transition: left 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    opacity: 0.6;
    box-shadow: 0 0 6px rgba(255, 140, 0, 0.5);
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 8px;
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 140, 0, 0.1);
    transition: all 0.3s ease;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
    line-height: 1.2;
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 
      0 0 20px rgba(255, 140, 0, 0.2),
      0 8px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: translateY(-2px) scale(1.02);

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
      box-shadow: 0 0 10px rgba(255, 140, 0, 0.8);
    }

    img {
      box-shadow: 
        0 6px 16px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 140, 0, 0.3),
        0 0 12px rgba(255, 140, 0, 0.15);
      transform: scale(1.05);
    }

    span {
      opacity: 1;
      text-shadow: 0 0 8px rgba(255, 140, 0, 0.5);
    }
  }
`;
