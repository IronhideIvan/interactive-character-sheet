import { CustomNote } from "../common/customNote";

export type CharacterFeatureGroup = {
  id: string;
  name: string;
  features: CharacterFeature[];
};

export type CharacterFeature = {
  featureId: string;
  notes?: CustomNote[];
};
