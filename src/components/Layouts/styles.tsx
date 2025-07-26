import { styled } from "styled-components";

export const StyledLayouts = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 140px; /* 헤더(80px) + 아코디언 헤더(60px) */

  @media (max-width: 768px) {
    padding-top: 130px; /* 헤더 + 아코디언 높이 조정 */
  }

  @media (max-width: 480px) {
    padding-top: 120px; /* 모바일 높이 조정 */
  }
`;

export const StyledMain = styled.main`
  flex-grow: 1;
  padding: 20px; // 전체적인 컨텐츠 영역에 패딩을 추가합니다.
`;
