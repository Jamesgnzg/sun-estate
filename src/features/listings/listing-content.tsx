import { FC, ReactElement, useEffect, useState } from "react";
import ListingViews from "./listing-views";
import ListingsBar from "./listing-bar";
import { FilterValue } from "../../interface/filter";
import { useListings } from "../../context/listings-context";

const ListingContent: FC = (): ReactElement => {
  const { filters } = useListings();
  const [filterPills, setFilterPills] = useState<FilterValue[]>([]);

  useEffect(() => {
    setFilterPills(() => {
      const newFilterPills: FilterValue[] = [];
      filters.forEach((filter) => {
        for (let i = 0; i < filter.valueLabels.length; i++) {
          newFilterPills.push({
            label: filter.valueLabels[i],
            value: filter.values[i],
          });
        }
        // Slider ranges get their own pill when no bracket is checked
        if (filter.values.length === 0 && filter.rangeLabel) {
          newFilterPills.push({
            label: filter.rangeLabel,
            value: filter.range?.min ?? 0,
          });
        }
      });

      return newFilterPills;
    });
  }, [filters]);

  return (
    <>
      <div className="p-3 w-full">
        <ListingsBar filterPills={filterPills} />
        <ListingViews />
      </div>
    </>
  );
};

export default ListingContent;
