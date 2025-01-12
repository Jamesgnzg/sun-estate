import { Button, Chip } from "@mui/material";
import { FC, ReactElement } from "react";
import { FilterValue } from "../../interface/filter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useListings } from "../../context/listings-context";

interface ListingsBarProps {
  filterPills: FilterValue[];
}

const ListingsBar: FC<ListingsBarProps> = ({
  filterPills,
}: ListingsBarProps): ReactElement => {
  const { estates, clearFilters } = useListings();

  const createFilterPill = (
    filter: FilterValue,
    index: number
  ): ReactElement => {
    return <Chip key={index} label={filter.label} variant="outlined" />;
  };

  return (
    <div className="flex justify-between pb-3">
      <p className="pt-2">{`${estates.length} (House for sale)`}</p>
      <div className="flex space-x-4">
        {filterPills.map((filter, index) => createFilterPill(filter, index))}
      </div>
      <div className="flex justify-between">
        <Button
          variant="outlined"
          className="bg-stone-200 border-stone-200 rounded-lg text-black"
          endIcon={<RestartAltIcon />}
          onClick={clearFilters}
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default ListingsBar;
