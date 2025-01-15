import { FC, ReactElement, useEffect } from "react";
import { useListings } from "../../context/listings-context";
import ListEstate from "./estate-cards/list-estate";
import TileCards from "./estate-cards/tile-cards";
import { Views } from "../../enums/view-type";
import { Estates } from "../../data/estates";

const ListingViews: FC = (): ReactElement => {
  const { estates, viewType, updateAvailableEstates, filters, applyFilters } =
    useListings();
  const { TILE } = Views;

  useEffect(() => {
    updateAvailableEstates(Estates);
  }, []);

  useEffect(() => {
    updateAvailableEstates(applyFilters(Estates));
  }, [filters]);

  return (
    <>
      <div
        className={`w-full grid gap-3 ${
          viewType == TILE ? "grid-cols-4" : "grid-cols-1"
        }`}
      >
        {estates.map((estate, index) =>
          viewType == TILE ? (
            <TileCards estate={estate} key={index} />
          ) : (
            <ListEstate estate={estate} key={index} />
          )
        )}
      </div>
    </>
  );
};

export default ListingViews;
