import { styled } from "styled-components";

export const StyledMovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

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
  }
`;

export const StyledMovieCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
  aspect-ratio: 2/3;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .movie-info {
    display: none; /* 데스크톱에서는 이미지만 표시 */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .movie-info {
      display: block;
      padding: ${({ theme }) => theme.spacing.sm};

      h3 {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text};
        margin-bottom: ${({ theme }) => theme.spacing.xs};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      p {
        font-size: 11px;
        color: ${({ theme }) => theme.colors.textMuted};
        margin: 0;
      }
    }
  }
`;
