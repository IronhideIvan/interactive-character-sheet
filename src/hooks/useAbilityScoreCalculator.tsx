import { AbilityScore } from "@/types/character/abilityScore";
import { useProficiencyBonus } from "./useProficiency";
import { CalculatedAbilityScore } from "@/types/calculated/calculatedAbilityScore";
import { ProficiencyLevel } from "@/types/character/score";
import { useCallback } from "react";

export const useAbilityScoreCalculator = () => {
  const proficiencyBonus = useProficiencyBonus();

  const calculateAbilityScore = useCallback((abilityScore: AbilityScore): CalculatedAbilityScore => {
    const totalScore = abilityScore.score.baseValue;
    const modifier = Math.floor((totalScore - 10) / 2);
    let savingThrow = modifier;
    if (abilityScore.score.proficiencyLevel === ProficiencyLevel.Proficiency) {
      savingThrow += proficiencyBonus;
    }
    else if (abilityScore.score.proficiencyLevel === ProficiencyLevel.Expertise) {
      savingThrow += proficiencyBonus + proficiencyBonus;
    }

    return {
      totalScore: totalScore,
      modifier: modifier,
      savingThrow: savingThrow,
    };
  }, [proficiencyBonus]);

  return calculateAbilityScore;
};
