import React from "react";
import { Logo, SearchBar } from "@components/index";
import { StyledHeader } from "./styles";
import { Link } from "react-router-dom";
import heartIcon from "@src/imgs/greyheart.png"; // 찜 목록 아이콘

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <div>
        <SearchBar />
        <Link to="/watch-list" style={{ marginLeft: "10px" }}>
          <img src={heartIcon} alt="Watch List" style={{ width: "30px", height: "30px", filter: "invert(100%)" }} />
        </Link>
      </div>
    </StyledHeader>
  );
};

export default Header;
