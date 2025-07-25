import { styled } from "styled-components";
import { LIST_CONATAINER_COLOR, TEXT_COLOR } from "@consts/colors";

export const StyledAccordion = styled.div`
  color: ${TEXT_COLOR};
  background-color: ${LIST_CONATAINER_COLOR};
  margin-bottom: 10px;
`;

export const StyledAccordionHeader = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  height: 5vh;
  width: 100%;
  position: relative; /* 버튼의 기준점 */
  img {
    height: 25px;
    width: 25px;
  }
`;

export const StyledAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
`;

export const StyledButton = styled.span`
  position: absolute;
  top: 50%;
  left: 190px;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
`;

export const StyledContents = styled.div`
  padding: 4px 8px;
`;
