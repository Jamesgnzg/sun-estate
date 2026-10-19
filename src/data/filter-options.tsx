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
    filterProperty: "property_type",
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
    filterProperty: "bedroom",
    options: [
      { label: "1 Bedroom", value: 1 },
      { label: "2 Bedrooms", value: 2 },
      { label: "3 Bedrooms", value: 3 },
      { label: "4 Bedrooms", value: 4 },
      { label: "> 4 Bedrooms", value: 5 },
    ],
  },
  {
    filterTitle: "Price",
    filterProperty: "price",
    options: [
      { label: "Under $50K", value: 0, range: { min: 0, max: 50000 } },
      { label: "$50K - $250K", value: 1, range: { min: 50000, max: 250000 } },
      { label: "$250K - $500K", value: 2, range: { min: 250000, max: 500000 } },
      { label: "$500K - $1M", value: 3, range: { min: 500000, max: 1000000 } },
      { label: "Over $1M", value: 4, range: { min: 1000000 } },
    ],
  },
] as const;
