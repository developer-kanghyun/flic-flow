import styled from "styled-components";

export const StyledWatchListButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(5px);

  img {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);

    img {
      transform: scale(1.1);
    }
  }
`;
