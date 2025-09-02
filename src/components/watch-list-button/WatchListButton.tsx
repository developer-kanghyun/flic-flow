import { useState, useEffect } from "react";
import { StyledWatchListButton } from "./styles";
import heartIcon from "@src/imgs/heart.svg";
import greyHeart from "@src/imgs/greyheart.webp";

interface WatchListButtonProps {
  movieId: number;
}

const WatchListButton = ({ movieId }: WatchListButtonProps) => {
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setIsWatched(watchlist.includes(movieId));
  }, [movieId]);

  const handleToggleWatchlist = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (isWatched) {
      watchlist = watchlist.filter((id: number) => id !== movieId);
    } else {
      watchlist.push(movieId);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    setIsWatched(!isWatched);
  };

  return (
    <StyledWatchListButton onClick={handleToggleWatchlist}>
      <img src={isWatched ? heartIcon : greyHeart} alt="Watchlist Toggle" />
    </StyledWatchListButton>
  );
};

export default WatchListButton;
