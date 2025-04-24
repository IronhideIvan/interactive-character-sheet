import WidgetPaper from "@/components/WidgetPaper";
import { useAbilityScoreCalculator } from "@/hooks/useAbilityScoreCalculator";
import { AbilityScore } from "@/types/character/abilityScore";
import { Ability } from "@/types/data/ability";
import { getBonusWithOperator } from "@/utils/bonusUtils";
import { Button, Text, VStack } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import AbilityScoreDrawer from "./AbilityScoreDrawer";
import { useModal } from "@/hooks/useModal";
import { useAppDispatch } from "@/redux/hooks";
import { upsertAbilityScore } from "../abilityScoresSlice";

type AbilityScoreWidgetProps = {
  abilityScore: AbilityScore;
  ability: Ability;
};

const AbilityScoreWidget = ({ abilityScore, ability }: AbilityScoreWidgetProps): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const calculate = useAbilityScoreCalculator();
  const calculatedScore = useMemo(() => calculate(abilityScore), [abilityScore, calculate]);

  const dispatch = useAppDispatch();
  const handleAbilityScoreChanged = (newAbilityScore: AbilityScore) => {
    dispatch(upsertAbilityScore(newAbilityScore));
  };

  return (
    <WidgetPaper py={0}>
      <Button
        py={3}
        variant={"ghost"}
        width={"100%"}
        height={"100%"}
        onClick={open}
      >
        <VStack>
          <Text>
            {ability.name}
          </Text>
          <Text>
            {calculatedScore.totalScore} ({getBonusWithOperator(calculatedScore.modifier)})
          </Text>
          <Text>
            Saving Throw: {getBonusWithOperator(calculatedScore.savingThrow)}
          </Text>
        </VStack>
      </Button>
      {isOpen && (
        <AbilityScoreDrawer
          open={isOpen}
          ability={ability}
          abilityScore={abilityScore}
          onClose={close}
          onChange={handleAbilityScoreChanged}
        />
      )}
    </WidgetPaper>
  );
};

export default AbilityScoreWidget;
