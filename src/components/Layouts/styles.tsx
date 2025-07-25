import { styled } from "styled-components";

export const StyledLayouts = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
