import DataGrid from "@/components/dataGrid/DataGrid";
import { Box } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { Feature } from "@/types/data/feature";
import { useAppSelector } from "@/redux/hooks";
import { EditorType } from "@/components/dataGrid/dataGridTypes";

type CharacterFeaturesDataSetProps = {
  groupId: string;
};

const CharacterFeaturesDataSet = ({ groupId }: CharacterFeaturesDataSetProps): JSX.Element => {
  const features = useAppSelector(state => state.featuresDataSet.latest);
  const allCharacterFeatures = useAppSelector(state => state.characterFeatures.latest);

  const parentCharacterFeatures = useMemo(() => allCharacterFeatures.filter(cf => cf.groupId === groupId),
    [allCharacterFeatures, groupId]);

  const filteredFeatures = useMemo(() => {
    const featureList: Feature[] = [];
    parentCharacterFeatures.forEach((cf) => {
      const feature = features.find(f => f.id == cf.featureId);
      if (feature) {
        featureList.push(feature);
      }
    });

    return featureList;
  }, [features, parentCharacterFeatures]);

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
            type: EditorType.Text,
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
