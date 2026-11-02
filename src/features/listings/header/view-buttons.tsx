import { FC, ReactElement } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useListings } from "../../../context/listings-context";
import { ViewTypes } from "../../../types/ViewTypes";
import { Views } from "../../../enums/view-type";

const ViewButtons: FC = (): ReactElement => {
  const { viewType, updateView } = useListings();
  const { LIST, TILE } = Views;

  const handleChange = (_: unknown, nextView: ViewTypes | null) => {
    // Exclusive groups pass null when the active button is clicked again
    if (nextView) updateView(nextView);
  };

  return (
    <ToggleButtonGroup
      size="small"
      value={viewType}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value={LIST} aria-label={LIST}>
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value={TILE} aria-label={TILE}>
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewButtons;
