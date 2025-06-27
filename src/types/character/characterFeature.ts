import { CustomNote } from "../common/customNote";

export type CharacterFeatureGroup = {
  id: string;
  name: string;
  features: CharacterFeature[];
  notes?: CustomNote[];
};

export type CharacterFeature = {
  featureId: string;
  notes?: CustomNote[];
};
