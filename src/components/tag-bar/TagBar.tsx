import React from "react";
import { StyledTagBar, StyledTagButton } from "./styles";
import { useFilterStore } from "@src/store/filterStore";

const TAGS = [
  { key: "all", label: "전체" },
  { key: "new", label: "신작" },
  { key: "popular", label: "인기" },
  { key: "drama", label: "드라마" },
  { key: "animation", label: "애니메이션" },
  { key: "documentary", label: "다큐멘터리" },
  { key: "entertainment", label: "예능" },
  { key: "sports", label: "스포츠" },
];

const TagBar = () => {
  const { activeTag, setActiveTag } = useFilterStore();

  return (
    <StyledTagBar>
      {TAGS.map((tag) => (
        <StyledTagButton
          key={tag.key}
          $active={activeTag === tag.key}
          onClick={() => setActiveTag(tag.key)}
        >
          {tag.label}
        </StyledTagButton>
      ))}
    </StyledTagBar>
  );
};

export default TagBar;