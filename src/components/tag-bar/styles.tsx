import styled from "styled-components";

export const StyledTagBar = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 8px;
    gap: 8px;
  }
`;

export const StyledTagButton = styled.button<{ $active: boolean }>`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.lightGrey};
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.text)};
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.9em;
  }
`;
