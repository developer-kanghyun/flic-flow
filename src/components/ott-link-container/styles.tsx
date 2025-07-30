import styled from "styled-components";

export const StyledOttLinkContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.lg};
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }
  
  
  .provider-grid {
    display: grid;
    gap: ${({ theme }) => theme.spacing.sm};
    grid-template-columns: 1fr;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
