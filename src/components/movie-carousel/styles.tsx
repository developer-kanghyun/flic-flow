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
  overflow: hidden; /* 이미지가 캐러셀 밖으로 나가지 않도록 완전 차단 */
  padding: 10px; /* 호버 시 scale 효과를 위한 여백 */
  width: calc(180px * 7 + 16px * 6 + 20px); /* 정확히 7개 카드 + 6개 갭 + 호버 여백 */
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(155px * 7 + 16px * 6 + 20px); /* 태블릿에서 7개 카드 */
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(130px * 5 + 16px * 4 + 20px); /* 모바일에서 5개 카드 */
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 16px; /* 명시적으로 16px 갭 설정 */
  transition: transform 0.3s ease-out;
  
  .carousel-item {
    flex: 0 0 180px; /* 고정 너비 - 200px에서 180px로 줄임 */
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex: 0 0 155px; /* 170px에서 155px로 줄임 */
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex: 0 0 130px; /* 140px에서 130px로 줄임 */
    }
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 80px;
  bottom: 120px;
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
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(0, 0, 0, 0.4);
    text-shadow: 0 0 30px rgba(255, 133, 0, 1);
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
    width: 6%;
    font-size: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none; /* 모바일에서는 스와이프만 */
  }
`;