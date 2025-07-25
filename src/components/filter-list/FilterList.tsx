import { useState } from "react";
import { Filter } from "@components/index";
import { StyledFilterList } from "./styles";

const FilterList = () => {
  const [filters, setFilters] = useState([
    {
      key: "netflix",
      label: "넷플릭스",
      // imgOn: netflixOn,
      // imgOff: netflixOff,
      active: false,
    },
    // {
    //   key: "disney",
    //   label: "디즈니",
    //   imgOn: disneyOn,
    //   imgOff: disneyOff,
    //   active: false,
    // },
    // {
    //   key: "coupang",
    //   label: "쿠팡",
    //   imgOn: coupangOn,
    //   imgOff: coupangOff,
    //   active: false,
    // },
    // {
    //   key: "tiving",
    //   label: "티빙",
    //   imgOn: tivingOn,
    //   imgOff: tivingOff,
    //   active: false,
    // },
    // {
    //   key: "whatcha",
    //   label: "왓챠",
    //   imgOn: whatchaxOn,
    //   imgOff: whatchaOff,
    //   active: false,
    // },
  ]);

  const handleChangeFilter = (key: string) => {
    setFilters((prevFilters) => {
      return prevFilters.map((filter) => {
        if (filter.key === key) {
          return { ...filter, active: !filter.active };
        } else {
          return { filter };
        }
      });
    });
  };

  return (
    <StyledFilterList>
      {filters.map((filter) => (
        <Filter
          filterKey={filter.key}
          label={filter.label}
          imgOn={filter.imgOn}
          imgOff={filter.imgOff}
          active={filter.active}
          handleChangeFilter={handleChangeFilter}
        />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;
