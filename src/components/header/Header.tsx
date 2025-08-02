import { useState, useEffect } from "react";
import Logo from "@src/components/logo/Logo";
import SearchBar from "@src/components/search-bar/SearchBar";
import FilterList from "@src/components/filter-list/FilterList";
import { StyledHeader, StyledWatchListIcon, StyledHeaderContainer, StyledServiceToggle, StyledAccordionContent } from "./styles";
import heartIcon from "@src/imgs/greyheart.png";
import triangleDown from "@src/imgs/triangleDown.png";

const Header = () => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleService = () => {
    setIsServiceOpen(prev => !prev);
  };

  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <div className="header-left">
          <Logo />
          <StyledServiceToggle onClick={toggleService} $isOpen={isServiceOpen}>
            서비스 목록
            <img src={triangleDown} alt={isServiceOpen ? "닫기" : "열기"} />
          </StyledServiceToggle>
        </div>
        <div className="header-right">
          <SearchBar />
          <StyledWatchListIcon to="/watch-list">
            <img src={heartIcon} alt="찜 목록" />
          </StyledWatchListIcon>
        </div>
      </StyledHeader>
      <StyledAccordionContent $isOpen={isServiceOpen}>
        <FilterList />
      </StyledAccordionContent>
    </StyledHeaderContainer>
  );
};

export default Header;
