import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import { muiTheme } from "./constants/mui-theme";

const AppProviders = () => {
  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider theme={muiTheme}>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
};

export default AppProviders;
