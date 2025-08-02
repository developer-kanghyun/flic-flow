import styled from "styled-components";

export const StyledSearchResult = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2em;
    padding-top: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8em;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 360px) {
    font-size: 1.6em;
  }
`;

export const StyledSearched = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  p {
    font-size: 1.2em;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }

  .loading, .error {
    font-size: 1.1em;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};
  }

  .error {
    color: #ff4444;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    
    p {
      font-size: 1.1em;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    
    p {
      font-size: 1em;
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
    
    .loading, .error {
      font-size: 1em;
      padding: ${({ theme }) => theme.spacing.lg};
    }
  }

  @media (max-width: 360px) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;
