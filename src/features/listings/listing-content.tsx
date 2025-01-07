import { FC, ReactElement } from "react";
import ListingViews from "./listing-views";
import ListingsBar from "./listing-bar";
import { Estates } from "../../data/estates";
import { FilterValue } from "../../interface/filter";

const ListingContent: FC = (): ReactElement => {
  const mockFilterPills: FilterValue[] = [
    { label: "Single Family Homes", value: 1 },
    { label: "$200k - $500k", value: 2 },
    { label: "> 1 Bedroom", value: 1 },
  ];

  return (
    <>
      <div className="p-3 w-full">
        <ListingsBar filterPills={mockFilterPills} />
        <ListingViews Estates={Estates} />
      </div>
    </>
  );
};

export default ListingContent;
