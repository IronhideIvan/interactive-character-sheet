import { useAbilityScoreCalculator } from "@/hooks/useAbilityScoreCalculator";
import { useSkillScoreCalculator } from "@/hooks/useSkillScoreCalculator";
import { AbilityScore } from "@/types/character/abilityScore";
import { SkillScore } from "@/types/character/skillScore";
import { Ability } from "@/types/data/ability";
import { getBonusWithOperator } from "@/utils/bonusUtils";
import { HStack, Text } from "@chakra-ui/react";
import { JSX } from "react";

type SkillModifierLabelProps = {
  skillScore: SkillScore;
  abilityModifier: AbilityScore;
  ability: Ability;
  isPrimary?: boolean;
};

const SkillModifierLabel = ({
  skillScore,
  abilityModifier,
  ability,
  isPrimary,
}: SkillModifierLabelProps): JSX.Element => {
  const calculateAbility = useAbilityScoreCalculator();
  const calculateSkill = useSkillScoreCalculator();

  const calculatedAbilityScore = calculateAbility(abilityModifier);
  const calculatedSkillScore = calculateSkill(skillScore, calculatedAbilityScore);

  return (
    <HStack gap={3}>
      <Text>{ability.name}{isPrimary ? " (Primary)" : ""}</Text>
      <Text>{getBonusWithOperator(calculatedSkillScore.modifier)}</Text>
    </HStack>
  );
};

export default SkillModifierLabel;
