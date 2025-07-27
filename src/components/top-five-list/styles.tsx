import styled from 'styled-components';

export const StyledTopFiveList = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h2 {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
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
    h2 {
      font-size: 24px;
      padding-left: 12px;
      margin-bottom: ${({ theme }) => theme.spacing.md};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h2 {
      font-size: 22px;
      padding-left: 10px;
    }
  }
`;

export const TopFiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px; /* 2.5배 증가 (24px * 2.5 = 60px) */
  width: 100%;
  max-width: 1600px; /* 전체 너비 제한 */
  padding-bottom: 50px; /* 번호가 아래로 나오므로 여유 공간 */

  /* 각 카드의 최대 너비 제한 */
  > * {
    max-width: 240px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 40px; /* 2.5배 증가 (16px * 2.5 = 40px) */
    padding-bottom: 40px;
    max-width: 1400px;
    
    > * {
      max-width: 200px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px; /* 2.5배 증가 (8px * 2.5 = 20px) */
    padding-bottom: 30px;
    max-width: 1000px;
    
    > * {
      max-width: 180px;
    }
    
    /* 4번째, 5번째 아이템은 가운데 정렬 */
    > :nth-child(4) {
      grid-column: 1 / 2;
      justify-self: end;
    }
    
    > :nth-child(5) {
      grid-column: 3 / 4;
      justify-self: start;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding-bottom: 25px;
    max-width: 600px;
    
    > * {
      max-width: 160px;
    }
    
    /* 모바일에서는 5번째 아이템을 가운데 배치 */
    > :nth-child(4) {
      grid-column: auto;
      justify-self: auto;
    }
    
    > :nth-child(5) {
      grid-column: 1 / -1;
      justify-self: center;
    }
  }
`;