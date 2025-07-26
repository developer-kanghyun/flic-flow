import { Logo, SearchBar } from "@components/index";
import { StyledHeader, StyledWatchListIcon } from "./styles";
import heartIcon from "@src/imgs/greyheart.png";

const Header = () => {
  return (
    <StyledHeader>
      <div className="header-left">
        <Logo />
      </div>
      <div className="header-right">
        <SearchBar />
        <StyledWatchListIcon to="/watch-list">
          <img src={heartIcon} alt="찜 목록" />
        </StyledWatchListIcon>
      </div>
    </StyledHeader>
  );
};

export default Header;
