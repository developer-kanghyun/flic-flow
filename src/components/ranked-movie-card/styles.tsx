import styled from "styled-components";

export const StyledRankedMovieCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 6px;
  overflow: visible;
  transition: all 0.3s ease;
  cursor: pointer;
  aspect-ratio: 2/3;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);

    .watch-list-btn {
      opacity: 1;
    }
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    overflow: hidden;
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

export const RankNumber = styled.div`
  position: absolute;
  bottom: -20px;
  left: -60px;
  z-index: 20;
  font-size: 160px;
  font-weight: 900;
  color: transparent;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #ff6b00 35%,
    transparent 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  pointer-events: none;
  text-shadow: 0 4px 24px rgba(255, 133, 0, 0.4);
  font-family: "Arial Black", sans-serif;
  line-height: 0.8;
  isolation: isolate; /* 새로운 stacking context 생성으로 포스터 영향 차단 */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 120px;
    left: -40px;
    bottom: -15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 80px;
    left: -20px;
    bottom: -10px;
  }
`;

export const WatchListButtonWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  z-index: 10;

  .watch-list-btn {
    opacity: 0;
    transition: opacity 0.3s ease;
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
