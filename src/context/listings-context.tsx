import { createContext, useContext, useState } from "react";
import { Views } from "../enums/view-type";
import { Estate } from "../interface/estate";
import { Filter } from "../interface/filter";
import { ViewTypes } from "../types/ViewTypes";

const { TILE } = Views;

type TlistingsContextType = {
  viewType: ViewTypes;
  estates: Estate[];
  filters: Filter[];
  updateView(view: string): void;
  updateAvailableEstates(estate: Estate[]): void;
  addFilterProperty(filter: Filter): void;
  updateFilters(filter: Filter): void;
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
      return prevFilters.map((filter) => {
        if (updatedFilter.property == filter.property) {
          filter.valueLabels = updatedFilter.valueLabels;
          filter.values = updatedFilter.values;
        }

        return filter;
      });
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
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => useContext(ListingsContext);
