import styled from 'styled-components';

export const StyledHybridSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    
    h3 {
      font-size: 20px;
    }
  }
`;

export const FixedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  .grid-item {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
    
    /* 4번째, 5번째 아이템 배치 */
    .grid-item:nth-child(4) {
      grid-column: 1;
    }
    
    .grid-item:nth-child(5) {
      grid-column: 3;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    
    .grid-item:nth-child(4) {
      grid-column: auto;
    }
    
    .grid-item:nth-child(5) {
      grid-column: 1 / -1;
      justify-self: center;
      max-width: 150px;
    }
  }
`;

export const CarouselWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  /* 캐러셀 헤더 숨기기 (이미 위에 있으므로) */
  h3 {
    display: none;
  }
`;