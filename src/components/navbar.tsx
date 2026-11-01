import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FOR_SALE, CONTACT } from "../routes/paths";
import { NAV_LABELS } from "../constants/labels";
const NavBar: FC = (): ReactElement => {
  const {
    BRAND,
    FOR_SALE: FOR_SALE_LABEL,
    FOR_RENT,
    PROJECTS,
    SELL,
    CONTACT_US,
    USER_AVATAR_ALT,
  } = NAV_LABELS;
  return (
    <>
      <div className="max-w-full p-3 bg-gray-900">
        <div className="flex justify-between">
          <p className="px-3 py-2 text-white">{BRAND}</p>
          <div className="flex space-x-4">
            <Link
              to={FOR_SALE}
              className="rounded-md px-3 py-2  text-white bg-gray-700"
              aria-current="page"
            >
              {FOR_SALE_LABEL}
            </Link>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {FOR_RENT}
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {PROJECTS}
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {SELL}
            </a>
            <Link
              to={CONTACT}
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {CONTACT_US}
            </Link>
          </div>
          <div className="flex justify-between">
            <p className="px-3 py-2 text-white">Hi Joseph!</p>
            <img
              className="mt-1 size-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt={USER_AVATAR_ALT}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
