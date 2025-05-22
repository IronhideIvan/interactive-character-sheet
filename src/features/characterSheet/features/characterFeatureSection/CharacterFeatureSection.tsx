import CollapsibleSection from "@/components/CollapsibleSection";
import { useFeatureFinder } from "@/hooks/useFeatureFinder";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { JSX } from "react";
import CharacterFeatureCard from "./CharacterFeatureCard";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

type CharacterFeatureSectionProps = {
  group: CharacterFeatureGroup;
};

const CharacterFeatureSection = ({ group }: CharacterFeatureSectionProps): JSX.Element => {
  const { findFeature } = useFeatureFinder();

  return (
    <CollapsibleSection label={group.name}>
      <SimpleGrid
        gap={2}
        mt={2}
        justifyContent="center"
        templateColumns="repeat(12, 1fr)"
        rowGap={4}
      >
        {group.features.map((cf) => {
          const data = findFeature(cf.featureId);
          if (data) {
            return (
              <GridItem key={cf.featureId} colSpan={{ base: 12, sm: 6, md: 4 }} maxWidth={"20rem"}>
                <CharacterFeatureCard feature={data} characterFeature={cf} />
              </GridItem>
            );
          }
          else {
            return <></>;
          }
        })}
      </SimpleGrid>
    </CollapsibleSection>
  );
};

export default CharacterFeatureSection;
