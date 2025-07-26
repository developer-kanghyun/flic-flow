import React, { useState, useCallback, useRef } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleHeaderClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <StyledAccordion>
      <StyledAccordionHeader onClick={handleHeaderClick} isOpen={isOpen}>
        {title}
        <StyledButton isOpen={isOpen}>
          <img src={triangleDown} alt={isOpen ? "닫기" : "열기"} />
        </StyledButton>
      </StyledAccordionHeader>
      <StyledAccordionContent
        ref={contentRef}
        style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
      >
        <StyledContents>{children}</StyledContents>
      </StyledAccordionContent>
    </StyledAccordion>
  );
};

export default Accordion;
