import { INDEX, FOR_SALE, CONTACT } from "../routes/paths";
import { RoutePath, TitleMap } from "../types/RouteTypes";

const titleMap: TitleMap = {
  [INDEX]: "Login",
  [FOR_SALE]: "For Sale",
  [CONTACT]: "Contact Us",
};

/**
 * Returns the title of a page based on its route path.
 * @param {string} path - The path of the page route.
 * @returns {string} The title of the page with the site name appended.
 */

export const getTitleFromRoute = (path: string): string => {
  const inMapping = titleMap[path as RoutePath];

  return inMapping
    ? `${inMapping} | Sun Estate`
    : "Not Found | Sun Estate";
};
