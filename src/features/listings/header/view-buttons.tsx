import { FC, ReactElement } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useListings } from "../../../context/listings-context";
import { ViewTypes } from "../../../types/ViewTypes";
import { Views } from "../../../enums/view-type";

const ViewButtons: FC = (): ReactElement => {
  const { viewType, updateView } = useListings();
  const { LIST, TILE } = Views;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: ViewTypes
  ) => {
    console.log(event);
    updateView(nextView);
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
      <ToggleButton value="quilt" aria-label="quilt">
        <ViewQuiltIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewButtons;
