import { styled } from "styled-components";

export const StyledSearchResult = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 20px;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

export const StyledSearched = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 100px); /* Adjust based on header/footer height */
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.2em;
    margin-bottom: 15px;
  }
`;
