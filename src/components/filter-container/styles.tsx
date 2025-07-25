import { styled } from "styled-components";

export const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px; /* Adjust max-width as needed */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
`;
