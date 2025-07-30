import styled from "styled-components";

export const StyledDetailPage = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  .loading,
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 1.2rem;
    text-align: center;
  }
`;

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 60vh;
    min-height: 500px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50vh;
    min-height: 400px;
  }
`;

export const HeroBackdrop = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 30%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 2;
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  
  .play-circle {
    width: 120px;
    height: 120px;
    border: none;
    background: linear-gradient(135deg, 
      rgba(220, 220, 220, 0.2) 0%, 
      rgba(192, 192, 192, 0.1) 100%
    );
    backdrop-filter: blur(25px);
    border: 3px solid rgba(192, 192, 192, 0.4);
    border-radius: 50%;
    color: #e8e8e8;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(192, 192, 192, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: linear-gradient(135deg, 
        rgba(220, 220, 220, 0.3) 0%, 
        rgba(192, 192, 192, 0.2) 100%
      );
      border-color: rgba(220, 220, 220, 0.6);
      transform: scale(1.1);
      box-shadow: 
        0 12px 48px rgba(0, 0, 0, 0.4),
        0 0 40px rgba(192, 192, 192, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    &:active {
      transform: scale(1.05);
    }
    
    svg {
      margin-left: 8px;
      width: 60px;
      height: 60px;
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
    }
  }
  
  .play-text {
    font-size: 1.1rem;
    font-weight: 700;
    color: #f0f0f0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    transition: text-shadow 0.3s ease;
  }
  
  &:hover .play-text {
    text-shadow: 
      0 2px 8px rgba(0, 0, 0, 0.8),
      0 0 12px rgba(192, 192, 192, 0.6);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
    
    .play-circle {
      width: 100px;
      height: 100px;
      border-width: 2px;
      
      svg {
        width: 48px;
        height: 48px;
        margin-left: 6px;
      }
    }
    
    .play-text {
      font-size: 1rem;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
    
    .play-circle {
      width: 80px;
      height: 80px;
      
      svg {
        width: 36px;
        height: 36px;
        margin-left: 4px;
      }
    }
    
    .play-text {
      font-size: 0.9rem;
      letter-spacing: 0.5px;
    }
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1200px;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  
  .hero-text {
    max-width: 50%;
    
    h1 {
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
    }
    
    .hero-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: ${({ theme }) => theme.spacing.md};
      
      .watchlist-wrapper {
        display: flex;
        align-items: center;
      }
      
      .imdb-rating {
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
      }
      
      .rotten-tomatoes {
        display: flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(
          135deg,
          rgba(255, 60, 60, 0.15) 0%,
          rgba(255, 80, 80, 0.1) 50%,
          rgba(255, 60, 60, 0.05) 100%
        );
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 60, 60, 0.3);
        border-radius: 8px;
        padding: 6px 10px;
        box-shadow:
          0 4px 12px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);

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
      
      .release-year {
        font-size: 1.1rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
      }
      
      .director {
        font-size: 1.1rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
      }
      
      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 6px;
        margin-bottom: ${({ theme }) => theme.spacing.sm};
        flex-wrap: wrap;
        
        .release-year, .director {
          font-size: 1rem;
        }
        
        .imdb-rating, .rotten-tomatoes {
          padding: 4px 8px;
          gap: 4px;

          .imdb-label {
            font-size: 0.6rem;
          }

          .rating-score, .rt-score {
            font-size: 0.8rem;
          }

          .rt-label {
            font-size: 0.7rem;
          }
        }
      }
    }
    
    .overview {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: ${({ theme }) => theme.spacing.lg};
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      max-width: 100%;
      
      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
      }
    }
    
    .hero-actions {
      display: flex;
      gap: ${({ theme }) => theme.spacing.md};
      
      .ott-logo-link {
        display: inline-block;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
        
        .ott-logo {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
      }
      
      .ott-link-button {
        display: flex;
        align-items: center;
        padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
        background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #e8e8e8 100%);
        color: #1a1a1a;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        text-decoration: none;
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
          padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
          font-size: 0.9rem;
        }
      }
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      max-width: 100%;
      text-align: center;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
    align-items: center;
    justify-content: center;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }
`;

export const MainContent = styled.main`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.9;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const MetadataCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(255, 215, 0, 0.8), rgba(255, 165, 0, 0.6));
    border-radius: 20px 20px 0 0;
  }
  
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
  }
  
  .metadata-grid {
    display: grid;
    gap: ${({ theme }) => theme.spacing.lg};
  }
  
  .metadata-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md};
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.06);
      transform: translateX(5px);
      border-color: rgba(255, 215, 0, 0.3);
    }
    
    .label {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .value {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      font-size: 1rem;
      text-align: right;
    }
  }
`;

export const CastCard = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }
  
  .cast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: ${({ theme }) => theme.spacing.md};
    }
  }
  
  .cast-item {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.sm};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      
      .cast-photo {
        transform: scale(1.05);
      }
      
      .cast-name {
        color: #fcda54;
      }
    }
    
    .cast-photo {
      width: 60px;
      height: 90px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }
    
    .cast-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: ${({ theme }) => theme.spacing.sm};
      
      .cast-name {
        font-weight: 700;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.3;
      }
      
      .cast-character {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        font-style: italic;
      }
    }
  }
`;

export const RecommendationsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;