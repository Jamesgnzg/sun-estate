import Listings from "../page/listings";
import ContactUs from "../page/contact-us";
import { INDEX, FOR_SALE, CONTACT } from "./paths";

export const privateRoutes = [
  {
    path: INDEX,
    element: <Listings />,
  },
  {
    path: FOR_SALE,
    element: <Listings />,
  },
  {
    path: CONTACT,
    element: <ContactUs />,
  },
];
