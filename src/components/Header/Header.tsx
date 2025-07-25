import React from "react";
import { Logo, SearchBar, WatchListButton } from "@components/index";
import { StyledHeader } from "./styles";

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <div>
        <SearchBar />
        <WatchListButton />
      </div>
    </StyledHeader>
  );
};

export default Header;
