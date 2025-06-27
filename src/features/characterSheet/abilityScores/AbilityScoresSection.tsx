import { useAppSelector } from "@/redux/hooks";
import { ConditionalValue, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import AbilityScoreWidget from "./widget/AbilityScoreWidget";
import { SectionTitle } from "@/components/SectionTitle";

type AbilityScoresSection = {
  columnSpan: ConditionalValue<number | "auto">;
};

const AbilityScoresSection = ({ columnSpan }: AbilityScoresSection): JSX.Element => {
  const abilityScores = useAppSelector(state => state.abilityScores.latest);
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);

  return (
    <VStack width={"100%"}>
      <SectionTitle label="Ability Scores" />
      <SimpleGrid
        gap={2}
        justifyContent={"center"}
        templateColumns={"repeat(12, 1fr)"}
        rowGap={4}
        width={"100%"}
      >
        {abilityScores.map((as) => {
          const ability = abilities.find(a => a.id === as.abilityId);
          if (!ability) {
            return <></>;
          }
          return (
            <GridItem key={as.abilityId} colSpan={columnSpan}>
              <AbilityScoreWidget abilityScore={as} ability={ability} />
            </GridItem>
          );
        })}

      </SimpleGrid>
    </VStack>
  );
};

export default AbilityScoresSection;
