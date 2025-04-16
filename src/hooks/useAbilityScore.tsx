import { AbilityScore } from "@/types/character/abilityScore";
import { useProficiencyBonus } from "./useProficiency";
import { useMemo } from "react";
import { CalculatedAbilityScore } from "@/types/calculated/calculatedAbilityScore";

export const useAbilityScore = (abilityScore: AbilityScore): CalculatedAbilityScore => {
  const proficiencyBonus = useProficiencyBonus();

  const calculatedAbilityScore = useMemo((): CalculatedAbilityScore => {
    const totalScore = abilityScore.baseScore;
    const modifier = Math.floor((totalScore - 10) / 2);
    let savingThrow = modifier;
    if (abilityScore.proficiency) {
      savingThrow += proficiencyBonus;
    }

    return {
      ...abilityScore,
      totalScore: totalScore,
      modifier: modifier,
      savingThrow: savingThrow,
    };
  }, [abilityScore, proficiencyBonus]);

  return calculatedAbilityScore;
};
