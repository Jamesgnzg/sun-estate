import { Chip } from "@mui/material";
import { FC, ReactElement } from "react";
import { FilterValue } from "../../interface/filter";

interface ListingsBarProps {
  filterPills: FilterValue[];
}

const ListingsBar: FC<ListingsBarProps> = ({
  filterPills,
}: ListingsBarProps): ReactElement => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const createFilterPill = (filter: FilterValue): ReactElement => {
    return (
      <Chip
        label={filter.label}
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <div className="flex justify-between pb-3">
      <p className="pt-2">10, 356 (House for sale)</p>
      <div className="flex space-x-4">
        {filterPills.map((filter) => createFilterPill(filter))}
      </div>
      <div className="flex justify-between"></div>
    </div>
  );
};

export default ListingsBar;
