import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledSearchBar,
  StyledSearchButton,
  StyledSearchInput,
} from "./styles";

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/searched?keyword=${encodeURIComponent(searchKeyword)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <StyledSearchBar>
      <StyledSearchInput
        placeholder="제목 검색"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="영화 검색 입력창"
      />
      <StyledSearchButton to="/searched" onClick={handleSearch}>
        <img src="src/imgs/magnifier.png" alt="Search Button" />
      </StyledSearchButton>
    </StyledSearchBar>
  );
};

export default SearchBar;
