import DataGrid from "@/components/dataGrid/DataGrid";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { v4 as uuidv4 } from "uuid";
import { upsert } from "@/utils/arrayUtils";

type FeaturesSectionDataSet = {
  characterFeatures: CharacterFeatureGroup[];
  onChange: (updatedSections: CharacterFeatureGroup[]) => void;
  reset: () => void;
};

const FeaturesSectionDataSet = ({ characterFeatures, onChange, reset }: FeaturesSectionDataSet): JSX.Element => {
  const handleGetId = (item: CharacterFeatureGroup) => {
    return item.id;
  };

  const handleStringValueChanged = (
    item: CharacterFeatureGroup,
    columnKey: keyof CharacterFeatureGroup,
    value: string,
  ) => {
    let newItem: CharacterFeatureGroup | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      onChange(upsert(newItem, characterFeatures, it => it.id === newItem.id));
    }
  };

  const handleAddRow = () => {
    onChange([
      ...characterFeatures,
      {
        id: uuidv4(),
        name: "",
        features: [],
      },
    ]);
  };

  const handleDeleteRow = (item: CharacterFeatureGroup) => {
    onChange(characterFeatures.filter(it => it.id !== item.id));
  };

  const handleRevertAllChanges = () => {
    reset();
  };

  const handleGetFriendlyName = (item: CharacterFeatureGroup) => {
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
          },
        ]}
        getId={handleGetId}
        getFriendlyName={handleGetFriendlyName}
        onStringValueChange={handleStringValueChanged}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onRevertAllChanges={handleRevertAllChanges}
      />
    </Box>
  );
};

export default FeaturesSectionDataSet;
