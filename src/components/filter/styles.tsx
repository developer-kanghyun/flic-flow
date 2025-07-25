import { styled } from "styled-components";
import { MAIN_POINT_COLOR, SUB_POINT_COLOR } from "@consts/colors";

export const StyledFilter = styled.div<{ active: boolean }>`
  align-items: center;
  box-sizing: border-box;
  border-radius: 3px;
  color: #005555;
  display: flex;
  font-size: 20px;
  font-family: sans-serif;
  padding: 2px;
  justify-content: center;

  background-color: ${(props) =>
    props.active ? `${SUB_POINT_COLOR}` : "#f1f1f1"};
`;
