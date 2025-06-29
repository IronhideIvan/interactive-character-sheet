import { EntityBase } from "../common/entityBase";

export type HitDice = EntityBase & {
  note: string;
  hitDie: number;
  max: number;
  numUsed: number;
};
