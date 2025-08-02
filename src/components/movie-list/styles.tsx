import { styled } from "styled-components";

export const StyledMovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
    padding: 0 ${({ theme }) => theme.spacing.xs};
  }
`;

export const StyledMovieCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
  aspect-ratio: 2/3;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }

  .movie-info {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .movie-info {
      display: block;
      padding: 6px;
      background: ${({ theme }) => theme.colors.surface};

      h3 {
        font-size: 11px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        margin-bottom: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      p {
        font-size: 10px;
        color: ${({ theme }) => theme.colors.textMuted};
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 2/3.2;
    
    .movie-info {
      padding: 4px;

      h3 {
        font-size: 10px;
        margin-bottom: 2px;
      }

      p {
        font-size: 9px;
      }
    }
    
    .no-image {
      font-size: 9px;
    }
  }
`;
