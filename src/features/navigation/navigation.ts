export type NavRoutes = {
  paths: NavItem[];
  fallback: NavItem;
};

export type NavItem = {
  path: string;
  value: string;
  friendlyName: string;
};
