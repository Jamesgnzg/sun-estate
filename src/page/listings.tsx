import { FC, ReactElement } from "react";
import ListingsFilter from "../features/listings/filter/listings-filter";
import ListingsHeader from "../features/listings/header/listings-header";
import { ListingsContextProvider } from "../context/listings-context";
import ListingContent from "../features/listings/listing-content";

const Listings: FC = (): ReactElement => {
  return (
    <>
      <ListingsContextProvider>
        <ListingsHeader />
        <div className="md:flex">
          <ListingsFilter />
          <ListingContent />
        </div>
      </ListingsContextProvider>
    </>
  );
};

export default Listings;
