import { styled } from "styled-components";

export const StyledOttLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9em;
  font-weight: bold;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 5px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
