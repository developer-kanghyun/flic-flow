import React from "react";
import { Header, Footer } from "@components/index";
import { StyledLayouts, StyledMain } from "./styles";

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = (props: LayoutsProps) => {
  const { children } = props;

  return (
    <>
      <StyledLayouts>
        <Header />
        <StyledMain>{children}</StyledMain>
        <Footer />
      </StyledLayouts>
    </>
  );
};

export default Layouts;
