import { PropertyType } from "../enums/property-type";
import { FilterOptions } from "../interface/filter";

const {
  SINGLE_FAMILY,
  CONDO_TOWNHOUSE,
  APARTMENT,
  COMMERCIAL,
  LAND,
  MULTI_FAMILY,
} = PropertyType;

export const Filters: FilterOptions[] = [
  {
    filterTitle: "Property Type",
    options: [
      SINGLE_FAMILY,
      CONDO_TOWNHOUSE,
      APARTMENT,
      COMMERCIAL,
      LAND,
      MULTI_FAMILY,
    ],
  },
  {
    filterTitle: "Bedrooms",
    options: [
      { label: "1 Bedroom", value: 1 },
      { label: "2 Bedrooms", value: 2 },
      { label: "3 Bedrooms", value: 3 },
      { label: "4 Bedrooms", value: 4 },
      { label: "> 4 Bedrooms", value: 5 },
    ],
  },
] as const;
