import WidgetPaper from "@/components/WidgetPaper";
import { useAbilityScore } from "@/hooks/useAbilityScore";
// import { useModal } from "@/hooks/useModal";
import { AbilityScore } from "@/types/character/abilityScore";
import { Ability } from "@/types/data/ability";
import { getBonusWithOperator } from "@/utils/bonusUtils";
import { Button, Text, VStack } from "@chakra-ui/react";
import { JSX } from "react";

type AbilityScoreWidgetProps = {
  abilityScore: AbilityScore;
  ability: Ability;
};

const AbilityScoreWidget = ({ abilityScore, ability }: AbilityScoreWidgetProps): JSX.Element => {
  const calcAbilityScore = useAbilityScore(abilityScore);
  // const { isOpen, open, close } = useModal();

  return (
    <WidgetPaper py={0}>
      <Button
        py={3}
        variant={"ghost"}
        width={"100%"}
        height={"100%"}
      >
        <VStack>
          <Text>
            {ability.name}
          </Text>
          <Text>
            {calcAbilityScore.totalScore},{getBonusWithOperator(calcAbilityScore.modifier)}
          </Text>
        </VStack>
      </Button>
    </WidgetPaper>
  );
};

export default AbilityScoreWidget;
