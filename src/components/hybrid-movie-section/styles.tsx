import styled from "styled-components";

export const StyledHybridSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

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
    margin-bottom: ${({ theme }) => theme.spacing.md};

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
  overflow: hidden; /* 이미지가 캐러셀 밖으로 나가지 않도록 완전 차단 */

  /* 캐러셀 헤더 숨기기 (이미 위에 있으므로) */
  h3 {
    display: none;
  }

  /* 캐러셀 콘텐츠 너비 제한 */
  > div > div:first-child {
    width: calc(
      180px * 7 + 16px * 6 + 20px
    ); /* 정확히 7개 카드 + 6개 갭 + 호버 여백 */
    margin: 0 auto;
    padding: 10px; /* 호버 시 scale 효과를 위한 여백 */
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: calc(155px * 7 + 16px * 6 + 20px); /* 태블릿에서 7개 카드 */
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      width: calc(130px * 5 + 16px * 4 + 20px); /* 모바일에서 5개 카드 */
    }
  }
`;
