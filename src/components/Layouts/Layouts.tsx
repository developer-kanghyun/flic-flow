import React from "react";
import { Header, Footer, Accordion, FilterList } from "@components/index";
import { useLocation } from "react-router-dom";
import { StyledLayouts } from "./styles";

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = (props: LayoutsProps) => {
  const { children } = props;
  const location = useLocation();
  const isMainPage = "/Main" === "/"; // Main 페이지 경로
  return (
    <>
      <StyledLayouts>
        <Header /> {/* 공통.. 컴포넌트!!! */}
        {!isMainPage && (
          <Accordion title="현재 이용중인 서비스">
            <FilterList />
          </Accordion>
        )}
        {children}
        <Footer />
      </StyledLayouts>
    </>
  );
};

export default Layouts;
