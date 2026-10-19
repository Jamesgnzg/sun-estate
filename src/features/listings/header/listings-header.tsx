import { FC, ReactElement } from "react";
import ViewButtons from "./view-buttons";
import LocationSearch from "./location-search";

const ListingsHeader: FC = (): ReactElement => {
  return (
    <>
      <div className="p-3 border bg-neutral-50">
        <div className="flex items-center justify-between gap-3">
          <span>HEADER</span>
          <LocationSearch />
          <ViewButtons />
        </div>
      </div>
    </>
  );
};

export default ListingsHeader;
