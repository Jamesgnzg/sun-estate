import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";
import {
  FC,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useListings } from "../../../context/listings-context";
import { Estates } from "../../../data/estates";
import { Estate } from "../../../interface/estate";
import { FilterValue, Filter, FilterRange } from "../../../interface/filter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LISTINGS_LABELS } from "../../../constants/labels";

interface FilterListProps {
  filterTitle: string;
  filterProperty: keyof Estate;
  filterOptions: FilterValue[];
  formatValue?: (value: number) => string;
}

type RangeOption = FilterValue & { range: FilterRange };

const FilterList: FC<FilterListProps> = ({
  filterTitle,
  filterProperty,
  filterOptions,
  formatValue = String,
}: FilterListProps): ReactElement => {
  const { SLIDER_MIN, SLIDER_MAX } = LISTINGS_LABELS;
  const { filters, updateFilters } = useListings();
  const propertyFilter: Filter | undefined = filters.find(
    (filter) => filter.property == filterProperty,
  );

  const rangeOptions = filterOptions.filter(
    (option): option is RangeOption => option.range !== undefined,
  );
  const hasRange = rangeOptions.length > 0;

  // Slider spans both the estate data and the defined brackets
  const bounds = useMemo(() => {
    if (!hasRange) return { min: 0, max: 0 };
    const values = [
      ...Estates.map((estate) => Number(estate[filterProperty])),
      ...rangeOptions.map((option) => option.range.min),
      ...rangeOptions.map((option) => option.range.max ?? option.range.min),
    ];
    return { min: Math.min(...values), max: Math.max(...values) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterProperty, hasRange]);

  // Step scales with the span, e.g. $10,000 for price and 1 for area
  const step = Math.max(
    1,
    10 ** (Math.floor(Math.log10(Math.max(bounds.max - bounds.min, 1))) - 2),
  );

  const rangeMin = propertyFilter?.range?.min ?? bounds.min;
  const rangeMax = propertyFilter?.range?.max ?? bounds.max;
  const [sliderValue, setSliderValue] = useState<number[]>([
    rangeMin,
    rangeMax,
  ]);

  // Keep the slider in sync when checkboxes or "Clear Filter" change the range
  useEffect(() => {
    setSliderValue([rangeMin, rangeMax]);
  }, [rangeMin, rangeMax]);

  const handleSliderCommit = (
    _event: Event | SyntheticEvent,
    value: number | number[],
  ) => {
    const [min, max] = value as number[];
    const isFullRange = min <= bounds.min && max >= bounds.max;

    // Moving the slider replaces any checked brackets
    updateFilters({
      property: filterProperty,
      valueLabels: [],
      values: [],
      range: isFullRange ? undefined : { min, max },
      rangeLabel: isFullRange
        ? undefined
        : `${formatValue(min)} – ${formatValue(max)}`,
    });
  };

  const handleChange = (event: SyntheticEvent, checked: boolean) => {
    const checkBoxElement = event.target as HTMLSelectElement;
    const checkBoxLabel = checkBoxElement.labels[0].innerText;
    const checkBoxValue = checkBoxElement.value;
    const isNumber = !isNaN(Number(checkBoxValue));
    const value = isNumber ? Number(checkBoxValue) : checkBoxValue;
    let updatedFilter: Filter | undefined = filters.find(
      (filter) => filter.property == filterProperty,
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
        values: [value],
      };

      updatedFilter = newFilter;
    }

    // Move the slider to cover the checked brackets
    if (hasRange) {
      const checkedRanges = rangeOptions
        .filter((option) => updatedFilter.values.includes(option.value))
        .map((option) => option.range);

      updatedFilter.range = checkedRanges.length
        ? {
            min: Math.min(...checkedRanges.map((range) => range.min)),
            max: Math.max(
              ...checkedRanges.map((range) => range.max ?? bounds.max),
            ),
          }
        : undefined;
      updatedFilter.rangeLabel = undefined;
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
                      checked={
                        propertyFilter
                          ? propertyFilter?.valueLabels.includes(option.label)
                          : false
                      }
                    />
                  }
                  label={option.label}
                  value={option.value}
                  onChange={handleChange}
                />
              ))}
            </FormGroup>
          </FormControl>
          {hasRange && (
            <div className="px-2 pb-2">
              <Slider
                className="text-red-500"
                value={sliderValue}
                min={bounds.min}
                max={bounds.max}
                step={step}
                onChange={(_event, value) => setSliderValue(value as number[])}
                onChangeCommitted={handleSliderCommit}
                valueLabelDisplay="auto"
                valueLabelFormat={formatValue}
                getAriaLabel={(index) =>
                  `${filterTitle} ${index === 0 ? SLIDER_MIN : SLIDER_MAX}`
                }
                getAriaValueText={formatValue}
                disableSwap
              />
              <p className="text-sm text-gray-600">
                {`${formatValue(sliderValue[0])} – ${formatValue(
                  sliderValue[1],
                )}`}
              </p>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterList;
