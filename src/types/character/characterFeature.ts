import { CollectionItem } from "@chakra-ui/react";
import { CustomNote } from "../common/customNote";
import { EntityBase } from "../common/entityBase";

export type CharacterFeatureGroup = CollectionItem & {
  name: string;
  notes?: CustomNote[];
};

export type CharacterFeature = EntityBase & {
  featureId: string;
  groupId: string;
  notes?: CustomNote[];
};
