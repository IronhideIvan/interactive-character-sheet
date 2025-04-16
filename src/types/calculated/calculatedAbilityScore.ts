import { AbilityScore } from "../character/abilityScore";

export type CalculatedAbilityScore = {
  totalScore: number;
  modifier: number;
  savingThrow: number;
} & AbilityScore;
