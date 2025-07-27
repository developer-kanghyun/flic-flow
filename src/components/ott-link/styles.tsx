import { styled } from "styled-components";

export const StyledOttLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 215, 0, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
    
    .provider-info img {
      transform: scale(1.05);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  .provider-info {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    z-index: 1;
    position: relative;
    
    img {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      object-fit: cover;
      flex-shrink: 0;
      transition: transform 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    .provider-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      .provider-name {
        font-weight: 600;
        font-size: 0.95rem;
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.2;
      }
      
      .provider-type {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 2px 6px;
        background: rgba(255, 215, 0, 0.15);
        border-radius: 4px;
        width: fit-content;
      }
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    
    .provider-info {
      img {
        width: 36px;
        height: 36px;
      }
      
      .provider-text {
        .provider-name {
          font-size: 0.9rem;
        }
        
        .provider-type {
          font-size: 0.75rem;
        }
      }
    }
  }
`;
