import BasicInformationSection from "@/features/characterSheet/basicInformation/BasicInformationSection";
import AbilitiesDataSet from "@/features/dataSets/abilities/AbilitiesDataSet";
import DataSets from "@/features/dataSets/DataSets";
import ProficiencyBonusDataSet from "@/features/dataSets/proficiencyBonuses/ProficiencyBonusDataSet";
import SkillsDataSet from "@/features/dataSets/skills/SkillsDataSet";
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
        element: (
          <DataSets>
            <AbilitiesDataSet />
          </DataSets>
        ),
      },
      {
        path: "abilities",
        element: (
          <DataSets>
            <AbilitiesDataSet />
          </DataSets>
        ),
      },
      {
        path: "prof",
        element: (
          <DataSets>
            <ProficiencyBonusDataSet />
          </DataSets>
        ),
      },
      {
        path: "skills",
        element: (
          <DataSets>
            <SkillsDataSet />
          </DataSets>
        ),
      },
    ],
  },
  {
    path: "sandbox",
    routes: [
      {
        index: true,
        element: <div />,
      },
    ],
  },
];
