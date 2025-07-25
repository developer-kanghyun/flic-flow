import { styled } from "styled-components";

export const StyledAccordion = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const StyledAccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 1em;
  }
`;

export const StyledAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    filter: invert(100%); /* Make triangle icons white for dark background */
  }
`;

export const StyledContents = styled.div`
  padding: 15px 0;
  color: ${({ theme }) => theme.colors.text};
`;
