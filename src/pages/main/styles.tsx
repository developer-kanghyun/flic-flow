import styled from "styled-components";

export const StyledBody = styled.div`
  min-height: 100vh;
  padding-top: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 70px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 60px;
  }
`;

export const StyledMainTopArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
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
      padding: 0 ${({ theme }) => theme.spacing.sm};
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
        font-size: 17px;
        margin-bottom: ${({ theme }) => theme.spacing.sm};
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    
    section {
      margin-bottom: ${({ theme }) => theme.spacing.md};
      
      h2 {
        font-size: 16px;
        margin-bottom: ${({ theme }) => theme.spacing.sm};
        padding: 0 ${({ theme }) => theme.spacing.xs};
      }
    }
    
    .loading, .error, .no-results {
      padding: ${({ theme }) => theme.spacing.lg};
      font-size: 14px;
    }
  }
`;
