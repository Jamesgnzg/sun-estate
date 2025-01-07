import { PropertyType } from "../enums/property-type";

export interface Estate {
  price: number;
  area: number;
  location: string;
  description: string;
  bedroom: number;
  bathroom: number;
  property_type: keyof typeof PropertyType;
}
