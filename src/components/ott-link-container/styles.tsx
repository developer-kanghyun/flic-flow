import { styled } from "styled-components";

export const StyledOttLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  justify-content: center;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 10px;
  }
`;
