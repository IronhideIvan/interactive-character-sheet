import { Route as AppRoute } from "@/config/Routes";
import { useRouteContext } from "@/context/RouteContext";
import { JSX, useCallback, useMemo } from "react";
import { Route, Routes } from "react-router";

const AppRoutes = (): JSX.Element => {
  const routes = useRouteContext();

  const buildRoutes = useCallback((r: AppRoute, index: number): JSX.Element => {
    if (r.routes) {
      return (
        <Route key={++index} path={r.path}>
          {r.routes && r.routes.map((c, i) => buildRoutes(c, i))}
        </Route>
      );
    }
    else {
      return (
        <Route
          key={++index}
          index={r.index}
          element={r.element}
          path={r.path}
        />
      );
    }
  }, []);

  const jsxRoutes = useMemo(() => routes.map((r, i) => {
    return buildRoutes(r, i);
  }), [buildRoutes, routes]);

  return (
    <Routes>
      {jsxRoutes}
    </Routes>
  );
};

export default AppRoutes;
