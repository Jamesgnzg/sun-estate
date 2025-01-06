import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProviders from "./App-providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
