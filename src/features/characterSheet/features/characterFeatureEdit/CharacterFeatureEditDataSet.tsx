import DataGrid from "@/components/dataGrid/DataGrid";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { Feature } from "@/types/data/feature";

type CharacterFeatureEditDataSetProps = {
  characterFeatures: Feature[];
  onRevertAllChanges?: () => void;
};

const CharacterFeatureEditDataSet = (
  { characterFeatures, onRevertAllChanges }: CharacterFeatureEditDataSetProps,
): JSX.Element => {
  const handleGetId = (item: Feature) => {
    return item.id;
  };

  const handleGetFriendlyName = (item: Feature) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={characterFeatures}
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
        onRevertAllChanges={onRevertAllChanges}
      />
    </Box>
  );
};

export default CharacterFeatureEditDataSet;
