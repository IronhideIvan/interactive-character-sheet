import CollapsibleSection from "@/components/CollapsibleSection";
import { useFeatureFinder } from "@/hooks/useFeatureFinder";
import { CharacterFeature, CharacterFeatureGroup } from "@/types/character/characterFeature";
import { JSX, useCallback } from "react";
import CharacterFeatureCard from "./CharacterFeatureCard";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { upsert } from "@/utils/arrayUtils";

type CharacterFeatureSectionProps = {
  group: CharacterFeatureGroup;
  onChange: (updatedGroup: CharacterFeatureGroup) => void;
};

const CharacterFeatureSection = ({ group, onChange }: CharacterFeatureSectionProps): JSX.Element => {
  const { findFeature } = useFeatureFinder();

  const handleCharacterFeatureChange = useCallback((updatedCharFeature: CharacterFeature) => {
    onChange({
      ...group,
      features: upsert(
        updatedCharFeature,
        [...group.features],
        item => item.featureId === updatedCharFeature.featureId,
      ),
    });
  }, [group, onChange]);

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
                <CharacterFeatureCard
                  feature={data}
                  characterFeature={cf}
                  onChange={handleCharacterFeatureChange}
                />
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
