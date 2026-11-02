/**
 * Project Name: sun-estate
 * Description: Application that allows people to view available real estates within their desired area
 *
 * Author: James Joseph Gonzaga
 * Email: j.jgonzaga03@gmail.com
 * Date: January 3, 2025
 */

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import { INDEX } from "./routes/paths";
import { privateRoutes } from "./routes/routes";
import { Helmet } from "react-helmet-async";
import { getTitleFromRoute } from "./utils/docTitle";

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Helmet>
        <title>{getTitleFromRoute(pathname)}</title>
      </Helmet>
      <Routes>
        <Route element={<MainLayout />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route key="/*" path="/*" element={<Navigate to={INDEX} />} />
      </Routes>
    </>
  );
};

export default App;
