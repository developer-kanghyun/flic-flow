import { styled } from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;

  div {
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 15px;
    height: auto;

    div {
      width: 100%;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
`;
