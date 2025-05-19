import CollapsibleSection from "@/components/CollapsibleSection";
import { useFeatureFinder } from "@/hooks/useFeatureFinder";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { JSX } from "react";
import CharacterFeatureCard from "./CharacterFeatureCard";

type CharacterFeatureSectionProps = {
  group: CharacterFeatureGroup;
};

const CharacterFeatureSection = ({ group }: CharacterFeatureSectionProps): JSX.Element => {
  const { findFeature } = useFeatureFinder();

  return (
    <CollapsibleSection label={group.name}>
      {group.features.map((cf) => {
        const data = findFeature(cf.featureId);
        if (data) {
          return <CharacterFeatureCard key={cf.featureId} feature={data} characterFeature={cf} />;
        }
        else {
          return <></>;
        }
      })}
    </CollapsibleSection>
  );
};

export default CharacterFeatureSection;
