import styled from "styled-components";

export const StyledSelectedOttsDisplay = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGrey};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  width: 100%;
  max-width: 400px; /* FilterContainer와 동일하게 설정 */
  box-sizing: border-box;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
    font-size: 1.1em;
    text-align: center;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 10px;
    h3 {
      font-size: 1em;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
