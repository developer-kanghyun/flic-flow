import { styled } from "styled-components";

export const StyledFilter = styled.button<{ active: string | undefined }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : '#0A0A0A'};
  color: ${({ theme, active }) => (active ? theme.colors.background : theme.colors.text)};
  transition: background-color 0.3s ease, color 0.3s ease;

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 5px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-size: 0.9em;
    font-weight: bold;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 8px;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 0.8em;
    }
  }
`;
