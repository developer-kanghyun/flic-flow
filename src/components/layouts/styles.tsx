import { styled } from "styled-components";

export const StyledLayouts = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px; /* 헤더(80px) */

  @media (max-width: 768px) {
    padding-top: 80px; /* 헤더 높이만 */
  }

  @media (max-width: 480px) {
    padding-top: 80px; /* 헤더 높이만 */
  }
`;

export const StyledMain = styled.main`
  flex-grow: 1;
  padding: 20px; // 전체적인 컨텐츠 영역에 패딩을 추가합니다.
`;
