import FloatingDrawer from "@/components/FloatingDrawer";
import ScoreEditor from "@/components/ScoreEditor";
import { useAppSelector } from "@/redux/hooks";
import { AbilityScore } from "@/types/character/abilityScore";
import { Score } from "@/types/character/score";
import { SkillScore } from "@/types/character/skillScore";
import { Ability } from "@/types/data/ability";
import { Skill } from "@/types/data/skill";
import { Separator, VStack } from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import { JSX, useMemo } from "react";
import SkillModifierLabel from "./SkillModifierLabel";

type SkillScoreDrawerProps = {
  open: boolean;
  skill: Skill;
  skillScore: SkillScore;
  onClose: () => void;
  onChange: (newSkillScore: SkillScore) => void;
};

type SkillAbilityScoresMap = {
  skillScore: SkillScore;
  abilityModifier: AbilityScore;
  ability: Ability;
};

const SkillScoreDrawer = ({
  skill,
  skillScore,
  open,
  onClose,
  onChange,
}: SkillScoreDrawerProps): JSX.Element => {
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);
  const abilityScores = useAppSelector(state => state.abilityScores.latest);

  const handleScoreChange = (newScore: Score) => {
    const newSkillScore = cloneDeep(skillScore);
    newSkillScore.score = newScore;
    onChange(newSkillScore);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const skillModifierList: SkillAbilityScoresMap[] = useMemo(() => {
    let primaryAbilityMap: SkillAbilityScoresMap | undefined;
    const otherAbilityMaps: SkillAbilityScoresMap[] = [];

    abilities.forEach((ability) => {
      const abilityScore = abilityScores.find(as => as.abilityId === ability.id);
      if (!abilityScore) {
        return;
      }

      const map: SkillAbilityScoresMap = {
        skillScore: skillScore,
        abilityModifier: abilityScore,
        ability: ability,
      };

      if (ability.id === skill.abilityId) {
        primaryAbilityMap = map;
      }
      else {
        otherAbilityMaps.push(map);
      }
    });

    if (primaryAbilityMap) {
      return [primaryAbilityMap, ...otherAbilityMaps];
    }
    else {
      return otherAbilityMaps;
    }
  }, [
    abilities,
    abilityScores,
    skill.abilityId,
    skillScore,
  ]);

  return (
    <FloatingDrawer
      title={skill.name}
      size={"md"}
      open={open}
      onOpenChange={det => handleOpenChange(det.open)}
    >
      <VStack>
        <ScoreEditor score={skillScore.score} onChange={handleScoreChange} hideBaseValueEditor />
        <Separator width={"100%"} />
        <VStack alignItems={"end"}>
          {skillModifierList.map((map, i) => {
            return (
              <SkillModifierLabel
                key={map.ability.id}
                skillScore={map.skillScore}
                ability={map.ability}
                abilityModifier={map.abilityModifier}
                isPrimary={i === 0}
              />
            );
          })}
        </VStack>
      </VStack>
    </FloatingDrawer>
  );
};

export default SkillScoreDrawer;
