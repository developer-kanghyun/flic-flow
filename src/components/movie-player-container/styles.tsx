import { styled } from "styled-components";

export const StyledMoviePlayerContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Adjust max-width as needed */
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;
