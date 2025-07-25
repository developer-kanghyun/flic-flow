import { styled } from "styled-components";

export const StyledBody = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const StyledRecommendResult = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 20px;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

export const StyledRecommended = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px 0;

  p {
    font-size: 1.2em;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  li {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    padding: 15px;
    border-radius: 8px;
    width: 200px;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    h3 {
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 5px;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: 0.9em;
      margin-bottom: 3px;
    }
  }
`;
