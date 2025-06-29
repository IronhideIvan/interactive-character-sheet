import { useAppSelector } from "@/redux/hooks";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import CharacterFeatureCard from "./CharacterFeatureCard";

type CharacterFeaturesSectionProps = {
  groupId: string;
};

const CharacterFeaturesSection = ({ groupId }: CharacterFeaturesSectionProps): JSX.Element => {
  const allCharacterFeatures = useAppSelector(state => state.characterFeatures.latest);
  const features = useAppSelector(state => state.featuresDataSet.latest);

  const groupFeatures = useMemo(() => {
    return allCharacterFeatures.filter(cf => cf.groupId === groupId);
  }, [allCharacterFeatures, groupId]);

  return (
    <SimpleGrid
      gap={2}
      mt={2}
      justifyContent="center"
      templateColumns="repeat(12, 1fr)"
      rowGap={4}
    >
      {groupFeatures.map((cf) => {
        const data = features.find(f => f.id === cf.featureId);
        if (data) {
          return (
            <GridItem key={cf.featureId} colSpan={{ base: 12, sm: 6, md: 4 }} maxWidth={"20rem"}>
              <CharacterFeatureCard
                feature={data}
                characterFeature={cf}
              />
            </GridItem>
          );
        }
        else {
          return <></>;
        }
      })}
    </SimpleGrid>
  );
};

export default CharacterFeaturesSection;
