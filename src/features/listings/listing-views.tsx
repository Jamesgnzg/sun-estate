import { FC, ReactElement } from "react";
import { useListings } from "../../context/listings-context";
import ListEstate from "./estate-cards/list-estate";
import TileCards from "./estate-cards/tile-cards";
import { Views } from "../../enums/view-type";
import { Estate } from "../../interface/estate";

interface ListingViewsProps {
  Estates: Estate[];
}

const ListingViews: FC<ListingViewsProps> = ({
  Estates,
}: ListingViewsProps): ReactElement => {
  const { viewType } = useListings();
  const { TILE } = Views;

  return (
    <>
      <div
        className={`w-full grid gap-2 ${
          viewType == TILE ? "grid-cols-4" : "grid-cols-1"
        }`}
      >
        {Estates.map((estate, index) =>
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
