import { styled } from "styled-components";

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  > div > h2 {
    font-size: 36px;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 20px;
    align-self: flex-start;
    padding-left: 10px;

    /* --- Gradient Properties --- */
    display: inline-block; /* Ensure a clear rendering context for the gradient */
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text; /* Apply the background to the text (for Webkit) */
    background-clip: text;         /* Standard */
    -webkit-text-fill-color: transparent; /* Make the text transparent (for Webkit) */
    color: transparent;            /* Standard fallback */
  }
`;

export const StyledFilterContainer = styled.div`
  width: 100%;
  max-width: 300px; /* Adjust as needed */
  margin-bottom: 20px;
`;

export const StyledMainTopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding-bottom: 20px;
  background-color: transparent; /* 배경색 투명으로 변경 */
  box-shadow: none; /* 그림자 제거 */

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;
