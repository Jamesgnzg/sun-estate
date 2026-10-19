import { createContext, useContext, useState } from "react";
import { Views } from "../enums/view-type";
import { Estate } from "../interface/estate";
import { Filter } from "../interface/filter";
import { Filters } from "../data/filter-options";
import { ViewTypes } from "../types/ViewTypes";

const { TILE } = Views;

const matchesFilter = (estate: Estate, filter: Filter): boolean => {
  if (filter.values.length === 0) return true;

  const estateValue = estate[filter.property];
  const options =
    Filters.find((option) => option.filterProperty == filter.property)
      ?.options ?? [];

  return filter.values.some((selected) => {
    const range = options.find((option) => option.value == selected)?.range;
    if (!range) return selected === estateValue;

    const value = Number(estateValue);
    return value >= range.min && (range.max === undefined || value < range.max);
  });
};

type TlistingsContextType = {
  viewType: ViewTypes;
  estates: Estate[];
  filters: Filter[];
  updateView(view: string): void;
  updateAvailableEstates(estate: Estate[]): void;
  addFilterProperty(filter: Filter): void;
  updateFilters(filter: Filter): void;
  applyFilters(estate: Estate[]): Estate[];
  clearFilters(): void;
};

type TlistingsContextProps = {
  children: React.ReactNode;
};

const ListingsContext = createContext<TlistingsContextType>(null!);

export const ListingsContextProvider = ({
  children,
}: TlistingsContextProps) => {
  const [viewType, setViewType] = useState<ViewTypes>(TILE);
  const [estates, setAvailableEstates] = useState<Estate[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const updateView = (view: ViewTypes): void => {
    setViewType(view);
  };

  const updateAvailableEstates = (estate: Estate[]): void => {
    setAvailableEstates(estate);
  };

  const addFilterProperty = (newFilter: Filter): void => {
    setFilters((filters) => {
      return [...filters, newFilter];
    });
  };

  const updateFilters = (updatedFilter: Filter): void => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const updatedIndex = prevFilters.findIndex(
        (filter) => filter.property == updatedFilter.property
      );

      if (updatedIndex > -1) {
        newFilters[updatedIndex].valueLabels = updatedFilter.valueLabels;
        newFilters[updatedIndex].values = updatedFilter.values;
      } else {
        //if filter is not existing add a new filter
        newFilters.push(updatedFilter);
      }

      return newFilters;
    });
  };

  const applyFilters = (estates: Estate[]): Estate[] => {
    const currentList = estates;
    const newList = currentList.filter((estate) =>
      filters.every((filter) => matchesFilter(estate, filter))
    );

    return newList;
  };

  const clearFilters = (): void => {
    setFilters((prevFilter) => {
      const newFilter = [...prevFilter];

      newFilter.forEach((filter) => {
        filter.valueLabels.length = 0;
        filter.values.length = 0;
      });

      return newFilter;
    });
  };

  return (
    <ListingsContext.Provider
      value={{
        viewType,
        estates,
        filters,
        updateView: updateView,
        updateAvailableEstates: updateAvailableEstates,
        addFilterProperty: addFilterProperty,
        updateFilters: updateFilters,
        applyFilters: applyFilters,
        clearFilters: clearFilters,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => useContext(ListingsContext);
