import styled from 'styled-components';

export const StyledCarousel = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CarouselHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h3 {
      font-size: 16px;
    }
  }
`;

export const CarouselContent = styled.div`
  position: relative;
  overflow: hidden;
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  transition: transform 0.3s ease-out;
  
  .carousel-item {
    flex: 0 0 164px; /* 고정 너비 */
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex: 0 0 140px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex: 0 0 120px;
    }
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4%;
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