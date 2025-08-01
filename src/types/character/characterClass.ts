import { EntityBase } from "../common/entityBase";

export type CharacterClass = EntityBase & {
  name: string;
  level: number;
};
