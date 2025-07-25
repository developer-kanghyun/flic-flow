import { styled } from "styled-components";

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  text-align: center;
  font-size: 0.9em;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;
