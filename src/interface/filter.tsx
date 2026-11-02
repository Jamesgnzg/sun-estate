import { Estate } from "./estate";

export interface Filter {
  property: keyof Estate;
  valueLabels: string[];
  values: any[];
  // Set by the range slider; estates must fall within [min, max]
  range?: FilterRange;
  rangeLabel?: string;
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
  // Formats slider values for range filters, e.g. currency or sqm
  formatValue?: (value: number) => string;
}
