import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledSearchBar,
  StyledSearchButton,
  StyledSearchInput,
} from "./styles";
import magnifierIcon from "../../imgs/magnifier.svg";

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
        placeholder="제목, 장르, 감독, 배우 검색"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="영화 검색 입력창"
      />
      <StyledSearchButton to="/searched" onClick={handleSearch}>
        <img src={magnifierIcon} alt="Search Button" />
      </StyledSearchButton>
    </StyledSearchBar>
  );
};

export default SearchBar;
