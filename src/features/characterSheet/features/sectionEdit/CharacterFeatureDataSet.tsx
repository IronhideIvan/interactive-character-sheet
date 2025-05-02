import DataGrid from "@/components/dataGrid/DataGrid";
import { CharacterFeature } from "@/types/character/characterFeature";
import { Box } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { Feature } from "@/types/data/feature";
import { useAppSelector } from "@/redux/hooks";

type CharacterFeaturesDataSetProps = {
  characterFeatures: CharacterFeature[];
};

const CharacterFeaturesDataSet = ({ characterFeatures }: CharacterFeaturesDataSetProps): JSX.Element => {
  const features = useAppSelector(state => state.featuresDataSet.latest);

  const filteredFeatures = useMemo(() => {
    const featureList: Feature[] = [];
    characterFeatures.forEach((cf) => {
      const feature = features.find(f => f.id == cf.featureId);
      if (feature) {
        featureList.push(feature);
      }
    });

    return featureList;
  }, [characterFeatures, features]);

  const handleGetId = (item: Feature) => {
    return item.id;
  };

  const handleGetFriendlyName = (item: Feature) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={filteredFeatures}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: "text",
            readonly: true,
          },
        ]}
        getId={handleGetId}
        getFriendlyName={handleGetFriendlyName}
      />
    </Box>
  );
};

export default CharacterFeaturesDataSet;
