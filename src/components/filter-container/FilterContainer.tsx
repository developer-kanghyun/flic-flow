import { FilterList, Accordion } from "@components/index";
import { StyledFilterContainer } from "./styles";

const FilterContainer = () => {
  return (
    <StyledFilterContainer>
      <Accordion title="서비스 목록">
        <FilterList />
      </Accordion>
    </StyledFilterContainer>
  );
};

export default FilterContainer;
