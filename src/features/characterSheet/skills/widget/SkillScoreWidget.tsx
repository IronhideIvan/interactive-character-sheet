import WidgetPaper from "@/components/WidgetPaper";
import { useAbilityScoreCalculator } from "@/hooks/useAbilityScoreCalculator";
import { getBonusWithOperator } from "@/utils/bonusUtils";
import { Button, Text, VStack } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import SkillScoreDrawer from "./SkillScoreDrawer";
import { useModal } from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { upsertSkillScore } from "../skillsSlice";
import { Skill } from "@/types/data/skill";
import { SkillScore } from "@/types/character/skillScore";
import { useSkillScoreCalculator } from "@/hooks/useSkillScoreCalculator";
import { CalculatedAbilityScore } from "@/types/calculated/calculatedAbilityScore";
import ProficiencyLevelIcon from "@/components/ProficiencyLevelIcon";

type SkillScoreWidgetProps = {
  skillScore: SkillScore;
  skill: Skill;
};

const SkillScoreWidget = ({ skillScore, skill }: SkillScoreWidgetProps): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const abilityScores = useAppSelector(state => state.abilityScores.latest);
  const calculateAbility = useAbilityScoreCalculator();
  const calculateSkill = useSkillScoreCalculator();

  const primaryAbilityScore = abilityScores.find(as => as.abilityId === skill.abilityId);

  const calculatedAbilityScore: CalculatedAbilityScore = useMemo(() => primaryAbilityScore
    ? calculateAbility(primaryAbilityScore)
    : {
      totalScore: 0,
      modifier: 0,
      savingThrow: 0,
    }, [calculateAbility, primaryAbilityScore]);

  const dispatch = useAppDispatch();
  const handleSkillScoreChanged = (newSkillScore: SkillScore) => {
    dispatch(upsertSkillScore(newSkillScore));
  };

  const calculatedSkillScore = useMemo(() => {
    return calculateSkill(skillScore, calculatedAbilityScore);
  }, [
    calculateSkill,
    calculatedAbilityScore,
    skillScore,
  ]);

  return (
    <WidgetPaper py={0}>
      <Button
        py={3}
        variant={"ghost"}
        width={"100%"}
        height={"100%"}
        onClick={open}
      >
        <VStack position={"relative"} width={"100%"}>
          <ProficiencyLevelIcon
            position={"absolute"}
            right={0}
            top={0}
            mr={-1}
            proficiencyLevel={skillScore.score.proficiencyLevel}
          />
          <Text>
            {skill.name}
          </Text>
          <Text>
            {getBonusWithOperator(calculatedSkillScore.modifier)}
          </Text>
        </VStack>
      </Button>
      {isOpen && (
        <SkillScoreDrawer
          open={isOpen}
          skill={skill}
          skillScore={skillScore}
          onClose={close}
          onChange={handleSkillScoreChanged}
        />
      )}
    </WidgetPaper>
  );
};

export default SkillScoreWidget;
