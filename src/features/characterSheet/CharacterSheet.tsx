import { VStack } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import BasicInformationSection from "./basicInformation/BasicInformationSection";
import AbilityScoresSection from "./abilityScores/AbilityScoresSection";
import SkillsSection from "./skills/SkillsSection";
import FeatureGroupCollectionsSection from "./features/FeatureGroupCollectionsSection";
import { useAppSelector } from "@/redux/hooks";
import { GroupCollectionType } from "@/types/common/groupCollection";
import CustomGridsSections from "./grids/CustomGridsSections";

const CharacterSheet = (): JSX.Element => {
  const collections = useAppSelector(state => state.groupCollections.latest);
  const groupCollections = useMemo(() =>
    collections.filter(c => c.type === GroupCollectionType.CharacterFeatureGroup), [collections]);

  return (
    <VStack
      paddingBottom={"3rem"}
    >
      <BasicInformationSection />
      <AbilityScoresSection columnSpan={{ base: 12, sm: 6, md: 4 }} />
      <SkillsSection columnSpan={{ base: 6, sm: 4, md: 3 }} />
      <CustomGridsSections />
      {groupCollections.map((gc) => {
        return (
          <FeatureGroupCollectionsSection key={gc.id} collection={gc} />
        );
      })}
    </VStack>
  );
};

export default CharacterSheet;
