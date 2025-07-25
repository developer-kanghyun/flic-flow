import React from "react";
import { StyledWatchList, StyledWatchListButton } from "./styles";

const WatchListButton = () => {
  return (
    <StyledWatchList>
      <StyledWatchListButton to="/watch-list">
        <img src="src/imgs/greenheart.png" alt="Watch list Button" />
      </StyledWatchListButton>
    </StyledWatchList>
  );
};

export default WatchListButton;
