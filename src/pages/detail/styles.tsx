import { styled } from "styled-components";

export const StyledBody = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const StyledMovieBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;
