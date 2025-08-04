import styled from "styled-components";

export const StyledCarousel = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CarouselHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h3 {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    padding: 0 12px 0 18px;
    position: relative;
    
    /* 미니멀한 그라데이션 배경 */
    background: linear-gradient(
      90deg,
      rgba(150, 150, 150, 0.1) 5%,
      rgba(255, 255, 255, 0) 20%,
      transparent 100%
    );
    
    /* 우측으로 점점 사라지는 효과 */
    mask: linear-gradient(90deg, black 0%, black 70%, transparent 100%);
    -webkit-mask: linear-gradient(90deg, black 0%, black 70%, transparent 100%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h3 {
      font-size: 24px;
      padding-left: 12px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h3 {
      font-size: 22px;
      padding-left: 10px;
    }
  }
`;

export const CarouselContent = styled.div`
  position: relative;
  overflow: hidden;
  padding: 10px;
  width: 100%;
  max-width: calc(180px * 3 + 16px * 2 + 20px);
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: calc(160px * 3 + 16px * 2 + 20px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: calc(140px * 3 + 14px * 2 + 20px);
    padding: 8px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(130px * 4 + 10px * 3 + 20px);
    padding: 6px;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 16px;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
  
  .carousel-item {
    flex: 0 0 180px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      flex: 0 0 160px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex: 0 0 140px;
      gap: 14px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex: 0 0 130px;
      gap: 10px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 60px;
  bottom: 100px;
  width: 50px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 60px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  pointer-events: auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(0, 0, 0, 0.4);
    text-shadow: 0 0 30px rgba(255, 133, 0, 1);
  }

  &:active {
    transform: scale(0.9);
  }

  &.prev {
    left: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
    
    &:hover {
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
    }
  }

  &.next {
    right: 0;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
    
    &:hover {
      background: linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 45px;
    width: 45px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;