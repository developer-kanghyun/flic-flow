import styled from "styled-components";

export const StyledRankedMovieList = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0;

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.8rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: bold;
  }
`;

export const StyledTopRanked = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledRankedItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 215, 0, 0.4); /* Neon border */
  aspect-ratio: 2 / 3; /* 포스터 비율 유지 */

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 215, 0, 0.8); /* Brighter neon on hover */
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.6); /* Neon glow */
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .no-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }) => theme.colors.surface};
      color: ${({ theme }) => theme.colors.textSecondary};
      border-radius: 8px;
      font-size: 0.9rem;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  /* WatchListButton positioning */
  .watch-list-button-wrapper {
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.xs};
    z-index: 2;
  }
`;

export const StyledRankNumber = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  left: ${({ theme }) => theme.spacing.xs};
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.6); /* Neon border */
`;

export const StyledCarouselSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.4rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: 600;
  }

  .carousel-container {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    overflow-x: auto;
    padding: ${({ theme }) => theme.spacing.xs} 0;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.scrollbarThumb} transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.scrollbarThumb};
      border-radius: 3px;
      
      &:hover {
        background: ${({ theme }) => theme.colors.scrollbarThumbHover};
      }
    }

    .carousel-item {
      min-width: 180px;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 215, 0, 0.4); /* Neon border */
      aspect-ratio: 2 / 3; /* 포스터 비율 유지 */

      &:hover {
        transform: translateY(-3px);
        border-color: rgba(255, 215, 0, 0.8); /* Brighter neon on hover */
        box-shadow: 0 0 15px rgba(255, 215, 0, 0.6); /* Neon glow */
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
          transition: transform 0.3s ease;
        }

        .no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${({ theme }) => theme.colors.surface};
          color: ${({ theme }) => theme.colors.textSecondary};
          border-radius: 6px;
          font-size: 0.8rem;
        }

        &:hover img {
          transform: scale(1.05);
        }
      }

      /* WatchListButton positioning */
      .watch-list-button-wrapper {
        position: absolute;
        bottom: ${({ theme }) => theme.spacing.xs};
        right: ${({ theme }) => theme.spacing.xs};
        z-index: 2;
      }
    }
  }

  @media (max-width: 768px) {
    .carousel-container {
      .carousel-item {
        min-width: 150px;
        
        a img,
        a .no-image {
          height: 200px;
        }
      }
    }
  }
`;