import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Feature } from "@/types/data/feature";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { deleteFeature, resetState, setFeatures, upsertFeature } from "./featuresDataSetSlice";
import { Icon } from "@/types/data/icon";
import { v4 as uuidv4 } from "uuid";

const FeaturesDataSet = (): JSX.Element => {
  const features = useAppSelector(state => state.featuresDataSet.latest);
  const dispatch = useAppDispatch();

  const handleGetId = (item: Feature) => {
    return item.id;
  };

  const handleAddRow = () => {
    // dispatch(setFeatures([
    //   ...features,
    //   { id: uuidv4() },
    // ]));
  };

  const handleDeleteRow = (item: Feature) => {
    dispatch(deleteFeature(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetState());
  };

  const handleGetFriendlyName = (item: Feature) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  const handleEditRowClick = (item: Feature) => {
    console.log(`item: ${item.id}`);
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={features}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: "text",
            readonly: true,
          },
          {
            name: "Description",
            key: "shortDescription",
            type: "text",
            readonly: true,
          },
        ]}
        getId={handleGetId}
        getFriendlyName={handleGetFriendlyName}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onRevertAllChanges={handleRevertAllChanges}
        onEditClick={handleEditRowClick}
      />
    </Box>
  );
};

export default FeaturesDataSet;
