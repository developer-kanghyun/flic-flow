import FilterList from "../filter-list/FilterList";
import Accordion from "../accordion/Accordion";
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
