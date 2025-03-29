import BasicInformationSection from "@/features/characterSheet/basicInformation/BasicInformationSection";
import AbilitiesDataSet from "@/features/dataSets/abilities/AbilitiesDataSet";
import { JSX } from "react";

export type Route = {
  path?: string;
  name?: string;
  element?: JSX.Element;
  routes?: Route[];
  index?: boolean;
};

export const appRoutes: Route[] = [
  {
    element: <BasicInformationSection />,
    index: true,
  },
  {
    path: "data",
    routes: [
      {
        index: true,
        element: <AbilitiesDataSet />,
      },
    ],
  },
];
