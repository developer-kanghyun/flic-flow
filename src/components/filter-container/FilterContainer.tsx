import React from "react";
import { FilterList } from "@components/index";
import { StyledFilterContainer } from "./styles";

const FilterContainer = () => {
  return (
    <StyledFilterContainer>
      <FilterList />
    </StyledFilterContainer>
  );
};

export default FilterContainer;
