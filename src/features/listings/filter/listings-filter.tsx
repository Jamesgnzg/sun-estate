import { Divider, Stack, Typography } from "@mui/material";
import { FC, ReactElement, useEffect } from "react";
import { Filters } from "../../../data/filter-options";
import { Filter, FilterOptions } from "../../../interface/filter";
import { useListings } from "../../../context/listings-context";
import FilterList from "../filter/Filters";
import { LISTINGS_LABELS } from "../../../constants/labels";

const ListingsFilter: FC = (): ReactElement => {
  const { FILTER_TITLE } = LISTINGS_LABELS;
  const { addFilterProperty } = useListings();
  const filterOptions = Filters;

  const createFiltersOptions = (FilterOptions: FilterOptions[]) => {
    FilterOptions.forEach((filter) => {
      const newFilter: Filter = {
        property: filter.filterProperty,
        valueLabels: [],
        values: [],
      };
      addFilterProperty(newFilter);
    });
  };

  useEffect(() => {
    createFiltersOptions(filterOptions);
  }, []);

  return (
    <>
      <aside id="default-sidebar" aria-label="Sidebar">
        <div className="h-full p-5 overflow-y-auto bg-neutral-50">
          <Typography component="span" className="text-2xl">
            {FILTER_TITLE}
          </Typography>
          <Stack className="pt-5">
            {filterOptions.map((filter, index) => (
              <div key={index}>
                <Divider className="bg-gray-50" />
                <FilterList
                  filterTitle={filter.filterTitle}
                  filterProperty={filter.filterProperty}
                  filterOptions={filter.options}
                />
              </div>
            ))}
          </Stack>
        </div>
      </aside>
    </>
  );
};

export default ListingsFilter;
