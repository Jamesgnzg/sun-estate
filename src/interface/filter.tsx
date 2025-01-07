import { Estate } from "./estate";

export interface Filter {
  property: keyof Estate;
  valueLabels: string[];
  values: unknown[];
}

export interface FilterValue {
  label: string;
  value: number;
}

export interface FilterOptions {
  filterTitle: string;
  filterProperty: keyof Estate;
  options: FilterValue[];
}
