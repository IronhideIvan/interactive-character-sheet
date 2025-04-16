import { VStack } from "@chakra-ui/react";
import { JSX } from "react";
import BasicInformationSection from "./basicInformation/BasicInformationSection";
import AbilityScoresSection from "./abilityScores/AbilityScoresSection";

const CharacterSheet = (): JSX.Element => {
  return (
    <VStack>
      <BasicInformationSection />
      <AbilityScoresSection columnSpan={{ base: 12, sm: 6, md: 4 }} />
    </VStack>
  );
};

export default CharacterSheet;
