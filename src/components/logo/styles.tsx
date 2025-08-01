import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Link)`
  font-size: 29px;
  font-weight: 800;
  background: linear-gradient(
    45deg,
    #ff8500 0%,
    #ffb000 25%,
    #ff9000 50%,
    #ffc000 75%,
    #ff8500 100%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(255, 133, 0, 0.3);
  animation: 
    gradientFlow 8s ease-in-out infinite,
    gentlePulse 6s ease-in-out infinite;
  position: relative;

  &:hover {
    transform: scale(1.02);
    animation: 
      gradientFlowFast 3s ease-in-out infinite,
      strongPulse 2s ease-in-out infinite;
  }

  @keyframes gradientFlow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes gradientFlowFast {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes gentlePulse {
    0%, 100% {
      filter: brightness(1) saturate(1);
    }
    50% {
      filter: brightness(1.04) saturate(1.05);
    }
  }

  @keyframes strongPulse {
    0%, 100% {
      filter: brightness(1) saturate(1);
    }
    50% {
      filter: brightness(1.12) saturate(1.15);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 22px;
  }
`;
