import { FC, ReactElement, useEffect } from "react";
import ListingViews from "./listing-views";
import ListingsBar from "./listing-bar";
import { Estates } from "../../data/estates";
import { FilterValue } from "../../interface/filter";
import { useListings } from "../../context/listings-context";

const ListingContent: FC = (): ReactElement => {
  const { estates, updateAvailableEstates, filters, applyFilters } =
    useListings();
  const mockFilterPills: FilterValue[] = [
    { label: "Single Family Homes", value: 1 },
    { label: "$200k - $500k", value: 2 },
    { label: "> 1 Bedroom", value: 1 },
  ];

  useEffect(() => {
    updateAvailableEstates(Estates);
  }, []);

  useEffect(() => {
    updateAvailableEstates(applyFilters(Estates));
  }, [filters]);

  return (
    <>
      <div className="p-3 w-full">
        <ListingsBar filterPills={mockFilterPills} />
        <ListingViews Estates={estates} />
      </div>
    </>
  );
};

export default ListingContent;
