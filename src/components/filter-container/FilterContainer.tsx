import React from "react";
import { FilterList, Accordion } from "@components/index";
import { StyledFilterContainer } from "./styles";

const FilterContainer = () => {
  return (
    <StyledFilterContainer>
      <Accordion title="OTT 플랫폼">
        <FilterList />
      </Accordion>
    </StyledFilterContainer>
  );
};

export default FilterContainer;
