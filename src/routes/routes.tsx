import Listings from "../page/listings";
import { INDEX, FOR_SALE } from "./paths";

export const privateRoutes = [
  {
    path: INDEX,
    element: <Listings />,
  },
  {
    path: FOR_SALE,
    element: <Listings />,
  },
];
