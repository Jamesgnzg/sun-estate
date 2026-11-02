import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource-variable/work-sans";
import AppProviders from "./App-providers";

createRoot(document.getElementById("root")!).render(<AppProviders />);
