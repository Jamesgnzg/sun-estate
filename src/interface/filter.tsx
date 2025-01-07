import { Estate } from "./estate";

export interface FilterValue {
  label: string;
  value: number;
}

export interface FilterOptions {
  filterTitle: string;
  filterProperty: keyof Estate[];
  options: FilterValue[];
}
