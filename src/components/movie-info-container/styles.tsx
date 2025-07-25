import { styled } from "styled-components";

export const StyledMovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 800px; /* Adjust max-width as needed */
  box-sizing: border-box;
  position: relative; /* Add this for absolute positioning of children */

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
