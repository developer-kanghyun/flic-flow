import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const HeroBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: white;

  .hero-info {
    max-width: 600px;

    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .year {
      font-size: 1.5rem;
      opacity: 0.8;
      margin-left: 10px;
    }

    .overview {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-top: 20px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .hero-actions {
    display: flex;
    gap: 15px;
    margin: 20px 0;
    align-items: center;
  }
`;

export const PlayButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;