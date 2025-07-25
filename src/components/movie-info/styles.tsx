import { styled } from "styled-components";

export const StyledMovieInfo = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin-left: 20px;
  flex: 1;
  position: relative; /* Add this for absolute positioning of children */

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2em;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  strong {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
    padding: 15px;
    h2 {
      font-size: 1.5em;
    }
  }
`;
