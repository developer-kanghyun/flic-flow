import { styled } from "styled-components";

export const StyledFilterContainer = styled.div`
  margin-top: 80px; /* 헤더 높이만큼 마진 */
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 56px; /* 모바일에서 헤더 높이 */
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
