import DataGrid from "@/components/dataGrid/DataGrid";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { Box } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCharacterFeatureGroup, upsertCharacterFeatureGroup } from "../FeatureGroup/featureGroupsSlice";

type FeaturesSectionDataSetProps = {
  collectionId: string;
};

const FeaturesSectionDataSet = ({ collectionId }: FeaturesSectionDataSetProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const allGroups = useAppSelector(state => state.featureGroups.latest);
  const collectionGroups = useMemo(() => allGroups.filter(g => g.collectionId === collectionId),
    [allGroups, collectionId]);

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
      dispatch(upsertCharacterFeatureGroup(newItem));
    }
  };

  const handleAddRow = () => {
    dispatch(upsertCharacterFeatureGroup({
      id: uuidv4(),
      collectionId: collectionId,
      name: "",
      features: [],
    }));
  };

  const handleDeleteRow = (item: CharacterFeatureGroup) => {
    dispatch(deleteCharacterFeatureGroup(item.id));
  };

  const handleGetFriendlyName = (item: CharacterFeatureGroup) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={collectionGroups}
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
      />
    </Box>
  );
};

export default FeaturesSectionDataSet;
