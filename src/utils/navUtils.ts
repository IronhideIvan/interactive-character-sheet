import { NavItem, NavRoutes } from "@/features/navigation/navigation";

export const matchRoute = (currentPathname: string, routes: NavRoutes): NavItem => {
  for (const item of routes.paths) {
    if (currentPathname.toLowerCase().includes(item.path)) {
      return item;
    }
  }

  return routes.fallback;
};

export const matchRouteValue = (navItemValue: string, routes: NavRoutes): NavItem => {
  for (const item of routes.paths) {
    if (navItemValue === item.value) {
      return item;
    }
  }

  return routes.fallback;
};
