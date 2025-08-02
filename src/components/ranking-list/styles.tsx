import { styled } from "styled-components";

export const StyledRankingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};

    &:last-child {
      border-bottom: none;
    }

    span {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1em;

      &:first-child {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  @media (max-width: 768px) {
    li {
      padding: 8px 0;
      span {
        font-size: 0.9em;
      }
    }
  }
`;
