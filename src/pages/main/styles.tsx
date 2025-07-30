import styled from "styled-components";

export const StyledBody = styled.div`
  min-height: 100vh;
  padding-top: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 56px;
  }
`;

export const StyledMainTopArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

export const StyledContentArea = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  section {
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    h2 {
      font-size: 18px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: ${({ theme }) => theme.spacing.md};
    }
  }

  .loading, .error, .no-results {
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .error {
    color: #ff4444;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    
    section {
      margin-bottom: ${({ theme }) => theme.spacing.lg};
      
      h2 {
        font-size: 16px;
        margin-bottom: ${({ theme }) => theme.spacing.sm};
      }
    }
  }
`;
