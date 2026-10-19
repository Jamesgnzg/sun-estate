import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FOR_SALE, CONTACT } from "../routes/paths";
const NavBar: FC = (): ReactElement => {
  return (
    <>
      <div className="max-w-full p-3 bg-gray-900">
        <div className="flex justify-between">
          <p className="px-3 py-2 text-white">Sun Estate</p>
          <div className="flex space-x-4">
            <Link
              to={FOR_SALE}
              className="rounded-md px-3 py-2  text-white bg-gray-700"
              aria-current="page"
            >
              For Sale
            </Link>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              For Rent
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Sell
            </a>
            <Link
              to={CONTACT}
              className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex justify-between">
            <p className="px-3 py-2 text-white">Hi Joseph!</p>
            <img
              className="mt-1 size-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="user"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
