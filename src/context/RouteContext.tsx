import { appRoutes, Route } from "@/config/Routes";
import { createContext, useContext } from "react";

export const RouteContext = createContext<Route[]>(appRoutes);

export const useRouteContext = () => useContext(RouteContext);
