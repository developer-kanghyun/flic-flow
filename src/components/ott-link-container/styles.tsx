import { styled } from "styled-components";

export const StyledOttLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px;
  background: 
    linear-gradient(135deg, 
      rgba(20, 20, 20, 0.95) 0%, 
      rgba(28, 28, 28, 0.9) 50%,
      rgba(20, 20, 20, 0.95) 100%
    );
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 140, 0, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(255, 140, 0, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(255, 164, 0, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      repeating-conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg,
        rgba(255, 140, 0, 0.01) 1deg,
        transparent 2deg
      );
    animation: rotate 60s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 12px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 10px;
  }
`;
