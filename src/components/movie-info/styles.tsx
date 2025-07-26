import { styled } from "styled-components";

export const StyledMovieInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  flex: 1;
  position: relative;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5em;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: 768px) {
    margin-left: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.md};
    h2 {
      font-size: 2em;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.8em;
    }
  }
`;
