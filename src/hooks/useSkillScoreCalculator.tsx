import { useProficiencyBonus } from "./useProficiency";
import { CalculatedAbilityScore } from "@/types/calculated/calculatedAbilityScore";
import { ProficiencyLevel } from "@/types/character/score";
import { useCallback } from "react";
import { SkillScore } from "@/types/character/skillScore";
import { CalculatedSkillScore } from "@/types/calculated/calculatedSkillScore";

export const useSkillScoreCalculator = () => {
  const proficiencyBonus = useProficiencyBonus();

  const calculateSkillScore = useCallback((
    skillScore: SkillScore, abilityModifier: CalculatedAbilityScore | undefined,
  ): CalculatedSkillScore => {
    let modifier = (abilityModifier?.modifier ?? 0) + skillScore.score.baseValue;
    if (skillScore.score.proficiencyLevel === ProficiencyLevel.Proficiency) {
      modifier += proficiencyBonus;
    }
    else if (skillScore.score.proficiencyLevel === ProficiencyLevel.Expertise) {
      modifier += proficiencyBonus + proficiencyBonus;
    }

    return { modifier: modifier };
  }, [proficiencyBonus]);

  return calculateSkillScore;
};
