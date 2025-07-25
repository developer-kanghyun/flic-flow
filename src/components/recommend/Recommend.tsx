import React from "react";
import { StyledRecommend } from "./styles";

interface LinkProps {
  genre: string;
}

const Recommend = (props: LinkProps) => {
  const { genre } = props;
  return <StyledRecommend>{genre}</StyledRecommend>;
};

export default Recommend;
