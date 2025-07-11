import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GroupCollection, GroupCollectionType } from "@/types/common/groupCollection";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { v4 } from "uuid";
import { deleteGroupCollection, resetState, upsertGroupCollection } from "./groupCollectionsSlice";
import DataGrid from "@/components/dataGrid/DataGrid";
import { EditorType } from "@/components/dataGrid/dataGridTypes";

const CollectionsDataSet = (): JSX.Element => {
  const collections = useAppSelector(state => state.groupCollections.latest);
  const dispatch = useAppDispatch();

  const handleGetId = (item: GroupCollection) => {
    return item.id;
  };

  const handleStringValueChanged = (item: GroupCollection, columnKey: keyof GroupCollection, value: string) => {
    let newItem: GroupCollection | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertGroupCollection(newItem));
    }
  };

  const handleAddRow = () => {
    dispatch(upsertGroupCollection({
      id: v4(),
      name: "",
      type: GroupCollectionType.CharacterFeatureGroup,
    }));
  };

  const handleDeleteRow = (item: GroupCollection) => {
    dispatch(deleteGroupCollection(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetState());
  };

  const handleGetFriendlyName = (item: GroupCollection) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={collections}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: EditorType.Text,
            readonly: false,
          },
        ]}
        getId={handleGetId}
        getFriendlyName={handleGetFriendlyName}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onRevertAllChanges={handleRevertAllChanges}
        onStringValueChange={handleStringValueChanged}
      />
    </Box>
  );
};

export default CollectionsDataSet;
