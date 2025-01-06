import { FC, ReactElement } from "react";
import { useListings } from "../../context/listings-context";
import { Estates } from "../../data/estates";
import ListEstate from "./estate-cards/list-estate";
import TileCards from "./estate-cards/tile-cards";
import { Views } from "../../enums/view-type";

const ListingViews: FC = (): ReactElement => {
  const { viewType } = useListings();
  const { TILE } = Views;

  return (
    <>
      <div
        className={`grid gap-2 ${
          viewType == TILE ? "grid-cols-4" : "grid-cols-1"
        } w-full`}
      >
        {Estates.map((estate) =>
          viewType == TILE ? (
            <TileCards estate={estate} />
          ) : (
            <ListEstate estate={estate} />
          )
        )}
      </div>
    </>
  );
};

export default ListingViews;
