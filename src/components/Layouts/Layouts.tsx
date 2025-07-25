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
  const isMainPage = location.pathname === "/"; // Main 페이지 경로
  return (
    <>
      <StyledLayouts>
        <Header /> {/* 공통.. 컴포넌트!!! */}
        {!isMainPage && (
          <Accordion title="서비스 목록">
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
