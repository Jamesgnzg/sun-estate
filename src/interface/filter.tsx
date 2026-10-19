import { Estate } from "./estate";

export interface Filter {
  property: keyof Estate;
  valueLabels: string[];
  values: any[];
}

export interface FilterRange {
  min: number;
  max?: number;
}

export interface FilterValue {
  label: string;
  value: number;
  // When set, the option matches estates within [min, max) instead of an exact value
  range?: FilterRange;
}

export interface FilterOptions {
  filterTitle: string;
  filterProperty: keyof Estate;
  options: FilterValue[];
}
