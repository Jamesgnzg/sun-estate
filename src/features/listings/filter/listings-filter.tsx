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

interface FilterListProps {
  filterTitle: string;
  filterOptions: FilterValue[];
}

const FilterList: FC<FilterListProps> = ({
  filterTitle,
  filterOptions,
}: FilterListProps): ReactElement => {
  const handleChange = (event: SyntheticEvent, checked: boolean) => {
    console.log(checked);
    console.log(event);
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
        <AccordionDetails>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
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
      <aside
        id="default-sidebar"
        className="w-72 min-h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
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
