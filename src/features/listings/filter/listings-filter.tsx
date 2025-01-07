import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactElement } from "react";
import { Filters } from "../../../data/filter-options";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FilterValue } from "../../../interface/filter";

interface FilterListProps {
  filterTitle: string;
  filterValues: FilterValue[];
}

const FilterList: FC<FilterListProps> = ({
  filterTitle,
  filterValues,
}: FilterListProps): ReactElement => {
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
        <AccordionDetails className="p-0">
          <FormGroup>
            {filterValues.map((values) => (
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#ef4444",
                      },
                    }}
                  />
                }
                label={values.label}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const ListingsFilter: FC = (): ReactElement => {
  const filtertitle = "Filter by";

  return (
    <>
      <aside
        id="default-sidebar"
        className="w-72 min-h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full p-5 overflow-y-auto bg-neutral-50">
          <p className="text-3xl">{filtertitle}</p>
          <Stack className="pt-5">
            {Filters.map((filter) => (
              <>
                <Divider className="bg-gray-50" />
                <FilterList
                  filterTitle={filter.filterTitle}
                  filterValues={filter.options}
                />
              </>
            ))}
          </Stack>
        </div>
      </aside>
    </>
  );
};

export default ListingsFilter;
