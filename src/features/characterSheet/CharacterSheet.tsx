import { VStack } from "@chakra-ui/react";
import { JSX } from "react";
import BasicInformationSection from "./basicInformation/BasicInformationSection";
import AbilityScoresSection from "./abilityScores/AbilityScoresSection";
import SkillsSection from "./skills/SkillsSection";
import FeaturesSection from "./features/FeaturesSection";

const CharacterSheet = (): JSX.Element => {
  return (
    <VStack
      paddingBottom={"3rem"}
    >
      <BasicInformationSection />
      <AbilityScoresSection columnSpan={{ base: 12, sm: 6, md: 4 }} />
      <SkillsSection columnSpan={{ base: 6, sm: 4, md: 3 }} />
      <FeaturesSection />
    </VStack>
  );
};

export default CharacterSheet;
