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
      <div className="w-full flex flex-wrap gap-3">
        {estates.map((estate, index) => (
          // Wrapper persists across view toggles so its width can transition
          <div
            key={index}
            className={`transition-[width] duration-700 ease-in-out motion-reduce:transition-none ${
              viewType == TILE ? "w-[calc(25%-0.5625rem)]" : "w-full"
            }`}
          >
            {viewType == TILE ? (
              <TileCards estate={estate} />
            ) : (
              <ListEstate estate={estate} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ListingViews;
