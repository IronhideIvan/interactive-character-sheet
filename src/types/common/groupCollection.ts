import { EntityBase } from "./entityBase";

export enum GroupCollectionType {
  CharacterFeatureGroup = "charFeatureGroup"
}

export type GroupCollection = EntityBase & {
  name: string;
  type: GroupCollectionType;
};

export type CollectionItem = EntityBase & {
  collectionId: string;
};
