import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Feature } from "@/types/data/feature";
import { Box } from "@chakra-ui/react";
import { JSX, useState } from "react";
import { deleteFeature, resetState, upsertFeature } from "./featuresDataSetSlice";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "@/hooks/useModal";
import FeatureEditor from "./FeatureEditor";
import cloneDeep from "lodash.clonedeep";
import { EditorType } from "@/components/dataGrid/dataGridTypes";

const FeaturesDataSet = (): JSX.Element => {
  const { open, isOpen, close } = useModal();
  const features = useAppSelector(state => state.featuresDataSet.latest);
  const dispatch = useAppDispatch();
  const [workingFeature, setWorkingFeature] = useState<Feature | undefined>();

  const handleGetId = (item: Feature) => {
    return item.id;
  };

  const handleAddRow = () => {
    setWorkingFeature({
      id: uuidv4(),
      name: "",
      shortDescription: "",
      description: "",
      caption: "",
      tags: [],
    });
    open();
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
    setWorkingFeature(cloneDeep(item));
    open();
  };

  const handleWorkingFeatureChange = (updatedFeature: Feature) => {
    setWorkingFeature(updatedFeature);
  };

  const handleSaveWorkingFeature = () => {
    if (workingFeature) {
      dispatch(upsertFeature(workingFeature));
    }
    close();
  };

  const handleCancelWorkingFeature = () => {
    setWorkingFeature(undefined);
    close();
  };

  const handleCloseWorkingFeature = () => {
    close();
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={features}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: EditorType.Text,
            readonly: true,
          },
          {
            name: "Tags",
            key: "tags",
            type: EditorType.Text,
            readonly: true,
          },
          {
            name: "Caption",
            key: "caption",
            type: EditorType.Text,
            readonly: true,
          },
          {
            name: "Tooltip",
            key: "shortDescription",
            type: EditorType.Text,
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
      {isOpen && workingFeature && (
        <FeatureEditor
          key={workingFeature.id}
          feature={workingFeature}
          isOpen={isOpen}
          onSave={handleSaveWorkingFeature}
          onClose={handleCloseWorkingFeature}
          onCancel={handleCancelWorkingFeature}
          onChange={handleWorkingFeatureChange}
        />
      )}
    </Box>
  );
};

export default FeaturesDataSet;
