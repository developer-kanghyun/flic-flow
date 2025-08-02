import { StyledTagBar, StyledTagButton } from "./styles";
import { useFilterStore } from "@src/store/filterStore";
import { TAGS } from "@src/utils/constants";

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