import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

const MainLayout: FC = (): ReactElement => {
  return (
    <div className="scroll-smooth min-h-screen bg-stone-100">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
