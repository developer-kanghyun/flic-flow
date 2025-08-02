import styled from "styled-components";

export const StyledFilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;
