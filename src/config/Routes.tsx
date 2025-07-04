import CharacterSheet from "@/features/characterSheet/CharacterSheet";
import AbilitiesDataSet from "@/features/dataSets/abilities/AbilitiesDataSet";
import CollectionsDataSet from "@/features/dataSets/collections/CollectionsDataSet";
import DataSets from "@/features/dataSets/DataSets";
import FeaturesDataSet from "@/features/dataSets/features/FeaturesDataSet";
import GridDataSet from "@/features/dataSets/grids/GridsDataSet";
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
    element: <CharacterSheet />,
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
        path: "collections",
        element: (
          <DataSets>
            <CollectionsDataSet />
          </DataSets>
        ),
      },
      {
        path: "features",
        element: (
          <DataSets>
            <FeaturesDataSet />
          </DataSets>
        ),
      },
      {
        path: "grids",
        element: (
          <DataSets>
            <GridDataSet />
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
