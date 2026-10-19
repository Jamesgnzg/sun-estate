import {
  FC,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useListings } from "../../../context/listings-context";
import { Estates } from "../../../data/estates";
import { Filter } from "../../../interface/filter";

const LOCATION_PROPERTY = "location";

const LocationSearch: FC = (): ReactElement => {
  const { filters, updateFilters } = useListings();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const locations = useMemo(
    () =>
      [...new Set(Estates.map((estate) => estate.location.trim()))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [],
  );

  // Selection lives in the listings context so pills and "Clear Filter" stay in sync
  const selected: string[] =
    filters.find((filter) => filter.property == LOCATION_PROPERTY)?.values ??
    [];

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const setSelected = (newSelected: string[]) => {
    const updatedFilter: Filter = {
      property: LOCATION_PROPERTY,
      valueLabels: [...newSelected],
      values: [...newSelected],
    };
    updateFilters(updatedFilter);
  };

  const toggleLocation = (location: string) => {
    setSelected(
      selected.includes(location)
        ? selected.filter((value) => value !== location)
        : [...selected, location],
    );
    setQuery("");
    inputRef.current?.focus();
  };

  const clearAll = () => {
    setSelected([]);
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) =>
          Math.min(index + 1, filteredLocations.length - 1),
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (isOpen && filteredLocations[activeIndex]) {
          toggleLocation(filteredLocations[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Backspace":
        if (!query && selected.length > 0) {
          setSelected(selected.slice(0, -1));
        }
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div
        className="flex flex-wrap items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 focus-within:ring-2 focus-within:ring-gray-700"
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((location) => (
          <span
            key={location}
            className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-sm text-white"
          >
            {location}
            <button
              type="button"
              aria-label={`Remove ${location}`}
              className="leading-none hover:text-gray-200"
              onClick={(event) => {
                event.stopPropagation();
                toggleLocation(location);
              }}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="location-listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && filteredLocations[activeIndex]
              ? `location-option-${activeIndex}`
              : undefined
          }
          placeholder={selected.length ? "" : "Search location"}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="min-w-[8rem] flex-1 py-1 outline-none"
        />
        {(selected.length > 0 || query) && (
          <button
            type="button"
            aria-label="Clear locations"
            className="ml-auto rounded-full px-2 text-lg leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            onClick={(event) => {
              event.stopPropagation();
              clearAll();
            }}
          >
            &times;
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          id="location-listbox"
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {filteredLocations.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500">
              No locations found
            </li>
          ) : (
            filteredLocations.map((location, index) => {
              const isSelected = selected.includes(location);
              return (
                <li
                  key={location}
                  id={`location-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => toggleLocation(location)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                    index === activeIndex ? "bg-gray-100" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    readOnly
                    tabIndex={-1}
                    checked={isSelected}
                    className="accent-red-500"
                  />
                  {location}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
