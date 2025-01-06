import Chip from "@mui/material/Chip";
import { FC, ReactElement } from "react";
import { FilterValue } from "../interface/filter";
import ListingsFilter from "../features/listings/filter/listings-filter";
import ListingsHeader from "../features/listings/header/listings-header";
import { ListingsContextProvider } from "../context/listings-context";
import ListingViews from "../features/listings/listing-views";

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

const Listings: FC = (): ReactElement => {
  const mockFilterPills: FilterValue[] = [
    { label: "Single Family Homes", value: 1 },
    { label: "$200k - $500k", value: 2 },
    { label: "> 1 Bedroom", value: 1 },
  ];

  return (
    <>
      <ListingsContextProvider>
        <ListingsHeader />
        <div className="md:flex">
          <ListingsFilter />
          <div className="p-3 w-full">
            <ListingsBar filterPills={mockFilterPills} />
            <ListingViews />
          </div>
        </div>
      </ListingsContextProvider>
    </>
  );
};

export default Listings;
