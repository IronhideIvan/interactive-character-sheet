import { EntityBase } from "../common/entityBase";

export type Feature = EntityBase & {
  name: string;
  caption: string;
  shortDescription: string;
  description: string;
  tags: string[];
};
