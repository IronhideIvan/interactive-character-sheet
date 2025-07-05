import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { v4 } from "uuid";
import DataGrid from "@/components/dataGrid/DataGrid";
import { EditorType } from "@/components/dataGrid/dataGridTypes";
import { CustomGrid } from "@/types/common/customGrid";
import { deleteCustomGrid, resetState, upsertCustomGrid } from "@/features/general/grids-old/customGridsSlice";

const GridDataSet = (): JSX.Element => {
  const collections = useAppSelector(state => state.customGrids.latest);
  const dispatch = useAppDispatch();

  const handleGetId = (item: CustomGrid) => {
    return item.id;
  };

  const handleStringValueChanged = (item: CustomGrid, columnKey: keyof CustomGrid, value: string) => {
    let newItem: CustomGrid | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertCustomGrid(newItem));
    }
  };

  const handleAddRow = () => {
    dispatch(upsertCustomGrid({
      id: v4(),
      name: "",
      rows: [],
      headers: [],
    }));
  };

  const handleDeleteRow = (item: CustomGrid) => {
    dispatch(deleteCustomGrid(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetState());
  };

  const handleGetFriendlyName = (item: CustomGrid) => {
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

export default GridDataSet;
