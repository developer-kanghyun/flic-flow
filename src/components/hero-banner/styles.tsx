import styled from "styled-components";

export const StyledHeroBanner = styled.section`
  position: relative;
  height: 60vh;
  min-height: 400px;
  max-height: 600px;
  width: 100%;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-radius: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 50vh;
    min-height: 300px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 40vh;
    min-height: 250px;
    border-radius: 8px;
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.1) 80%,
      transparent 100%
    );
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
    
    &::before {
      width: 100%;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const HeroInfo = styled.div`
  max-width: 50%;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 70%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #fff9eb 0%, #fcda54 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.1;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 3px 8px rgba(254, 203, 55, 0.5));

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 3.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.8rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

export const HeroOverview = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  opacity: 0.9;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const HeroMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  .release-year {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 6px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    .release-year {
      font-size: 1rem;
    }
  }
`;

export const HeroRating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(
    135deg,
    rgba(255, 133, 0, 0.15) 0%,
    rgba(255, 183, 0, 0.1) 50%,
    rgba(255, 133, 0, 0.05) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 133, 0, 0.3);
  border-radius: 8px;
  padding: 6px 10px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  .imdb-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: #f5c518;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }

  .rating-score {
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  }

  &.rotten-tomatoes {
    background: linear-gradient(
      135deg,
      rgba(255, 60, 60, 0.15) 0%,
      rgba(255, 80, 80, 0.1) 50%,
      rgba(255, 60, 60, 0.05) 100%
    );
    border: 1px solid rgba(255, 60, 60, 0.3);

    .rt-label {
      font-size: 0.8rem;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
    }

    .rt-score {
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4px 8px;
    gap: 4px;

    .imdb-label {
      font-size: 0.6rem;
    }

    .rating-score, .rt-score {
      font-size: 0.8rem;
    }

    &.rotten-tomatoes .rt-label {
      font-size: 0.7rem;
    }
  }
`;

export const PlayButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #e8e8e8 100%);
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }


  &:hover {
    background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 50%, #d8d8d8 100%);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 1rem;
  }
`;
