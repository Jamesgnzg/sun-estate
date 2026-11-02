import { createTheme } from "@mui/material/styles";

/**
 * MUI theme for the app.
 * Typography inherits the font from <html>, which Tailwind sets from
 * `fontFamily.sans` in tailwind.config.js, so the font is configured in one place.
 */
export const muiTheme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});
