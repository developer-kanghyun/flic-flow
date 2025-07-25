import { styled } from "styled-components";

export const StyledWatchListButton = styled.button`
  position: absolute;
  bottom: 10px; /* Adjust bottom position */
  right: 10px; /* Adjust right position */
  z-index: 10; /* Ensure it's above other content */
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  img {
    width: 20px;
    height: 20px;
    filter: drop-shadow(0 0 0 ${({ theme }) => theme.colors.secondary}); /* Secondary color for heart */
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
