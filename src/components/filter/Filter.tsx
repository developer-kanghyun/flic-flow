import { StyledFilter } from "./styles";

interface FilterProps {
  filterKey: string;
  label: string;
  imgOn: string;
  imgOff: string;
  active: boolean;
  handleChangeFilter: (name: string) => void;
}

const Filter = (props: FilterProps) => {
  const { filterKey, label, imgOn, imgOff, active, handleChangeFilter } = props;

  return (
    <StyledFilter onClick={() => handleChangeFilter(filterKey)} $active={active ? "true" : undefined}>
      <img src={active ? imgOn : imgOff} alt={label} loading="lazy" />
      <span>{label}</span>
    </StyledFilter>
  );
};

export default Filter;
