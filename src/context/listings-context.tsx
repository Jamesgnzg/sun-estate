import { createContext, useContext, useState } from "react";
import { Views } from "../enums/view-type";
import { ViewTypes } from "../types/ViewTypes";

const { TILE } = Views;

type TlistingsContextType = {
  viewType: ViewTypes;
  updateView(view: string): void;
};

type TlistingsContextProps = {
  children: React.ReactNode;
};

const ListingsContext = createContext<TlistingsContextType>(null!);

export const ListingsContextProvider = ({
  children,
}: TlistingsContextProps) => {
  const [viewType, setViewType] = useState<ViewTypes>(TILE);

  const updateView = (view: ViewTypes): void => {
    setViewType(view);
  };

  return (
    <ListingsContext.Provider value={{ viewType, updateView: updateView }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => useContext(ListingsContext);
