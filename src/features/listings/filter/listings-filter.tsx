import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactElement, SyntheticEvent, useEffect } from "react";
import { Filters } from "../../../data/filter-options";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Filter, FilterOptions, FilterValue } from "../../../interface/filter";
import { useListings } from "../../../context/listings-context";
import { Estate } from "../../../interface/estate";

interface FilterListProps {
  filterTitle: string;
  filterProperty: keyof Estate;
  filterOptions: FilterValue[];
}

const FilterList: FC<FilterListProps> = ({
  filterTitle,
  filterProperty,
  filterOptions,
}: FilterListProps): ReactElement => {
  const { filters, updateFilters } = useListings();
  const handleChange = (event: SyntheticEvent, checked: boolean) => {
    const checkboxTarget = event.target as HTMLSelectElement;
    const checkBoxLabel = checkboxTarget.labels[0].innerText;
    const checkBoxValue = checkboxTarget.value;
    const isNumber = !isNaN(Number(checkBoxValue));
    const value = isNumber ? Number(checkBoxValue) : checkBoxValue;
    let updatedFilter: Filter | undefined = filters.find(
      (filter) => filter.property == filterProperty
    );

    if (updatedFilter) {
      if (checked) {
        updatedFilter.valueLabels.push(checkBoxLabel);
        updatedFilter.values.push(value);
      } else {
        //remove if existing
        const index = updatedFilter.values.indexOf(value);
        updatedFilter.valueLabels.splice(index, 1);
        updatedFilter.values.splice(index, 1);
      }
    } else {
      const newFilter: Filter = {
        property: filterProperty,
        valueLabels: [checkBoxLabel],
        values: [checkBoxValue],
      };

      updatedFilter = newFilter;
    }

    updateFilters(updatedFilter);
  };

  return (
    <>
      <Accordion className="bg-neutral-50 shadow-none p-0 border-0">
        <AccordionSummary
          className="p-0"
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls={`content-${filterTitle}`}
          id={`panel-${filterTitle}`}
        >
          <Typography component="span">{filterTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pb: 1, pt: 0 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              {filterOptions.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#ef4444",
                        },
                      }}
                    />
                  }
                  label={option.label}
                  value={option.value}
                  onChange={handleChange}
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const ListingsFilter: FC = (): ReactElement => {
  const { addFilterProperty } = useListings();
  const filtertitle = "Filter by";
  const filterOptions = Filters;

  const createFiltersOptions = (FilterOptions: FilterOptions[]) => {
    FilterOptions.forEach((filter) => {
      const newFilter: Filter = {
        property: filter.filterProperty,
        valueLabels: [],
        values: [],
      };
      addFilterProperty(newFilter);
    });
  };

  useEffect(() => {
    createFiltersOptions(filterOptions);
  }, []);

  return (
    <>
      <aside id="default-sidebar" aria-label="Sidebar">
        <div className="h-full p-5 overflow-y-auto bg-neutral-50">
          <Typography component="span" className="text-2xl">
            {filtertitle}
          </Typography>
          <Stack className="pt-5">
            {filterOptions.map((filter, index) => (
              <div key={index}>
                <Divider className="bg-gray-50" />
                <FilterList
                  filterTitle={filter.filterTitle}
                  filterProperty={filter.filterProperty}
                  filterOptions={filter.options}
                />
              </div>
            ))}
          </Stack>
        </div>
      </aside>
    </>
  );
};

export default ListingsFilter;
