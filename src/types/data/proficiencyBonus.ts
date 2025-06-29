import { EntityBase } from "../common/entityBase";

export type ProficiencyBonus = EntityBase & {
  level: number;
  bonus: number;
};
