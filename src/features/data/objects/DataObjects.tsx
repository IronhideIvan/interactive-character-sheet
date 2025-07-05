import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { JSX, ReactNode, useCallback, useMemo, useState } from "react";
import DataField from "./DataField";
import { DataObject, DataObjectValueType } from "@/types/data/dataObject";
import { upsertDataObject } from "@/features/general/dataObjects/datObjectsSlice";
import { Box, Button, createListCollection, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { v4 } from "uuid";
import { getDefaultDataObjectValueByType } from "@/features/general/dataObjects/dataObjectUtil";
import { useModal } from "@/hooks/useModal";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import TextEditor from "@/components/TextEditor";
import { DataDropdownEditor, DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import { FaRegEdit } from "react-icons/fa";
import { ID } from "@/types/common/entityBase";

const DataObjects = (): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const [editObject, setEditObject] = useState<DataObject | undefined>();
  const dispatch = useAppDispatch();
  const objectDict = useAppSelector(state => state.dataObjects.latest);
  const objectDictKeys = useMemo(() => {
    return Object.keys(objectDict);
  }, [objectDict]);

  const handleFieldChange = useCallback((newDataObject: DataObject) => {
    dispatch(upsertDataObject(newDataObject));
  }, [dispatch]);

  const fields: {
    id: ID;
    node: ReactNode;
  }[] = [];
  objectDictKeys.forEach((key) => {
    const dataObj = objectDict[key];
    if (dataObj) {
      fields.push({
        id: dataObj.id,
        node: <DataField data={dataObj} onChange={handleFieldChange} />,
      });
    }
  });

  const handleSaveDataField = useCallback(() => {
    if (editObject) {
      dispatch(upsertDataObject(editObject));
    }

    close();
    setEditObject(undefined);
  }, [
    close,
    dispatch,
    editObject,
  ]);

  const handleAddNewDataField = useCallback(() => {
    setEditObject({
      id: v4(),
      name: "",
      type: DataObjectValueType.Text,
      value: getDefaultDataObjectValueByType(DataObjectValueType.Text),
    });
    open();
  }, [open]);

  const handleNameChange = useCallback((value: string) => {
    setEditObject({
      ...editObject!,
      name: value,
    });
  }, [editObject]);

  const handleTypeChange = useCallback((values: string[]) => {
    if (!values[0]) {
      return;
    }
    setEditObject({
      ...editObject!,
      type: values[0] as DataObjectValueType,
    });
  }, [editObject]);

  const handleValueChange = useCallback((newObj: DataObject) => {
    setEditObject({
      ...editObject!,
      value: newObj.value,
    });
  }, [editObject]);

  const handleDialogCancel = useCallback(() => {
    setEditObject(undefined);
    close();
  }, [close]);

  const handleOpenEditMode = useCallback((id: string) => {
    const dataObj = objectDict[id];
    if (dataObj) {
      setEditObject(dataObj);
      open();
    }
  }, [objectDict, open]);

  return (
    <Box>
      <VStack width={"100%"} justifyContent={"center"} alignItems={"center"}>
        {fields.map((f) => {
          return (
            <HStack key={f.id}>
              <IconButton variant={"outline"} onClick={() => handleOpenEditMode(f.id)}>
                <FaRegEdit />
              </IconButton>
              {f.node}
            </HStack>
          );
        })}
        <Button width={"100%"} variant={"outline"} onClick={handleAddNewDataField}>Add</Button>
      </VStack>
      {isOpen && editObject && (
        <SimpleDialog
          title={editObject.name.length > 0 ? editObject.name : "Unnamed Data Field"}
          open={isOpen}
          onSave={handleSaveDataField}
          actionButtonsType={ActionButtonType.SaveCancel}
          onClose={handleDialogCancel}
          onCancel={handleDialogCancel}
        >
          <Box display={"flex"} justifyContent={"center"} width={"100%"}>
            <VStack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              maxWidth={"300px"}
              spaceY={2}
            >
              <TextEditor label="Name" onValueChange={handleNameChange} value={editObject.name} />
              <VStack alignItems={"start"} width={"100%"}>
                <Text>Type</Text>
                <DataDropdownEditor
                  collection={typeReferenceOptions}
                  selectedItemIds={[editObject.type]}
                  onSelectionChange={handleTypeChange}
                />
              </VStack>
              <VStack alignItems={"start"} width={"100%"}>
                <Text>Value</Text>
                <DataField data={editObject} hideLabel onChange={handleValueChange} />
              </VStack>
            </VStack>
          </Box>
        </SimpleDialog>
      )}
    </Box>
  );
};

const typeReferenceOptions = createListCollection<DataDropdownItem>({
  items: [
    {
      id: DataObjectValueType.Text,
      label: "Text",
    },
    {
      id: DataObjectValueType.Boolean,
      label: "True/False",
    },
    {
      id: DataObjectValueType.Number,
      label: "Number",
    },
  ],
  itemToValue: item => item.id,
});

export default DataObjects;
