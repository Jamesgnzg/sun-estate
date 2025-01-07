import { Estate } from "../interface/estate";
import { PropertyType } from "../enums/property-type";

const {
  SINGLE_FAMILY,
  CONDO_TOWNHOUSE,
  APARTMENT,
  COMMERCIAL,
  LAND,
  MULTI_FAMILY,
} = PropertyType;

export const Estates: Estate[] = [
  {
    price: 400000,
    area: 10000,
    location: "Marikina",
    description: "Smooth",
    property_type: SINGLE_FAMILY,
    bedroom: 3,
    bathroom: 4,
  },
  {
    price: 20000,
    area: 83,
    location: "Quezon City",
    description: "Smooth",
    property_type: CONDO_TOWNHOUSE,
    bedroom: 1,
    bathroom: 2,
  },
  {
    price: 500000,
    area: 205,
    location: "Taguig City",
    description: "Smooth",
    property_type: COMMERCIAL,
    bedroom: 13,
    bathroom: 10,
  },
  {
    price: 1000000,
    area: 500,
    location: "Marikina",
    description: "Smooth",
    property_type: SINGLE_FAMILY,
    bedroom: 20,
    bathroom: 15,
  },
  {
    price: 9000000,
    area: 950,
    location: "Marikina",
    description: "Smooth",
    property_type: MULTI_FAMILY,
    bedroom: 103,
    bathroom: 34,
  },
  {
    price: 100000,
    area: 550,
    location: "Marikina",
    description: "Smooth",
    property_type: LAND,
    bedroom: 20,
    bathroom: 5,
  },
  {
    price: 25000,
    area: 45,
    location: "Marikina",
    description: "Smooth",
    property_type: APARTMENT,
    bedroom: 5,
    bathroom: 1,
  },
] as const;
