import { CustomNote, CustomNoteType } from "@/types/common/customNote";
import { Box, createListCollection, ListCollection } from "@chakra-ui/react";
import { JSX, useCallback, useMemo } from "react";
import DataGrid from "../../../components/dataGrid/DataGrid";
import { DataDropdownItem } from "../../../components/dataGrid/editors/DataDropdownEditor";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCustomNote, upsertCustomNote } from "./customNotesSlice";

type CustomNotesManagerProps = {
  parentId: string;
};

const CustomNotesManager = ({ parentId }: CustomNotesManagerProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const allNotes = useAppSelector(state => state.customNotes.latest);
  const parentNotes = useMemo(() => {
    return allNotes.filter(n => n.parentId === parentId);
  }, [allNotes, parentId]);

  const upsertNote = useCallback((item: CustomNote): void => {
    dispatch(upsertCustomNote(item));
  }, [dispatch]);

  const handleGetReferenceOptions = useCallback((columnKey: keyof CustomNote): ListCollection<DataDropdownItem> => {
    if (columnKey === "type") {
      return typeReferenceOptions;
    }
    else {
      throw new Error(`unknown type ${columnKey}`);
    }
  }, []);

  const handleAddRow = useCallback(() => {
    upsertNote({
      id: v4(),
      parentId: parentId,
      name: "",
      type: "text",
      value: {},
    });
  }, [parentId, upsertNote]);

  const handleDeleteRow = useCallback((item: CustomNote) => {
    dispatch(deleteCustomNote(item.id));
  }, [dispatch]);

  const handleStringValueChanged = (item: CustomNote, columnKey: keyof CustomNote, value: string) => {
    let newItem: CustomNote | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      upsertNote(newItem);
    }
  };

  const handleReferenceValueChanged = (item: CustomNote, columnKey: keyof CustomNote, value: string[]) => {
    if (value.length === 0) {
      return;
    }

    if (columnKey === "type") {
      const selectedType = value[0];
      const newItem: CustomNote = { ...item, type: (selectedType as CustomNoteType), value: {} };
      upsertNote(newItem);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={parentNotes}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: "text",
          },
          {
            name: "Type",
            key: "type",
            type: "reference",
            minWidth: "10rem",
          },
        ]}
        getId={(item) => {
          return item.id;
        }}
        getFriendlyName={(item) => {
          return item.name;
        }}
        getReferenceOptions={handleGetReferenceOptions}
        onReferenceValueChange={handleReferenceValueChanged}
        onStringValueChange={handleStringValueChanged}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
      />
    </Box>
  );
};

const typeReferenceOptions = createListCollection<DataDropdownItem>({
  items: [
    {
      id: "text",
      label: "Text",
    },
    {
      id: "boolean",
      label: "True/False",
    },
    {
      id: "number",
      label: "Number",
    },
  ],
  itemToValue: item => item.id,
});

export default CustomNotesManager;
