import styled from 'styled-components';

export const StyledMovieCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;
  aspect-ratio: 2/3;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 
      0 4px 12px rgba(255, 133, 0, 0.3),
      0 0 20px rgba(255, 220, 0, 0.4);
    border-color: rgba(255, 220, 0, 0.8);

    .watch-list-btn {
      opacity: 1;
    }
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
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
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;

export const WatchListButtonWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  z-index: 20;

  .watch-list-btn {
    opacity: 0;
    transition: opacity 0.2s ease;
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: #000;
    }
  }
`;
