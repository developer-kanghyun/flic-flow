import React, { useState, useCallback } from "react";
import triangleUp from "../../imgs/triangleUp.png";
import triangleDown from "../../imgs/triangleDown.png";

import {
  StyledAccordion,
  StyledAccordionContent,
  StyledAccordionHeader,
  StyledButton,
  StyledContents,
} from "./styles";

interface AccordionProps {
  children: React.ReactNode;
  title: string;
}

const Accordion = (props: AccordionProps) => {
  const { children, title } = props;
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  const [collapse, setCollapse] = useState(false);

  const handleHeaderClick = useCallback(
    () => {
      if (parentRef.current === null) return;
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
      } else {
        if (childRef.current === null) return;
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setCollapse(!collapse);
    },
    [collapse],
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const triangle =
    parentRefHeight === "0px" ? (
      <img src={triangleDown} alt="열기" />
    ) : (
      <img src={triangleUp} alt="닫기" />
    );
  return (
    <StyledAccordion>
      <StyledAccordionHeader onClick={handleHeaderClick}> {/* onClick을 StyledAccordionHeader로 이동 */}
        {title}
        <StyledButton>{triangle}</StyledButton> {/* onClick 제거 */}
      </StyledAccordionHeader>
      <StyledAccordionContent ref={parentRef}>
        <StyledContents ref={childRef}>{children}</StyledContents>
      </StyledAccordionContent>
    </StyledAccordion>
  );
};

export default Accordion;
