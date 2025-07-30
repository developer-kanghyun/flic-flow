import styled from "styled-components";

export const StyledSearchResult = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

export const StyledSearched = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
  min-height: calc(100vh - 100px); /* Adjust based on header/footer height */
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.2em;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;
