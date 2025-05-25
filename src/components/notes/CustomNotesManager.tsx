import { CustomNote, CustomNoteType } from "@/types/common/customNote";
import { Box, createListCollection, ListCollection } from "@chakra-ui/react";
import { JSX, useCallback } from "react";
import DataGrid from "../dataGrid/DataGrid";
import { DataDropdownItem } from "../dataGrid/editors/DataDropdownEditor";
import { upsert } from "@/utils/arrayUtils";
import { v4 } from "uuid";

type CustomNotesManagerProps = {
  customNotes: CustomNote[];
  onChange: (newNotes: CustomNote[]) => void;
};

const CustomNotesManager = ({ customNotes, onChange }: CustomNotesManagerProps): JSX.Element => {
  const upsertNote = useCallback((item: CustomNote): void => {
    onChange(upsert(item, [...customNotes], it => it.id === item.id));
  }, [customNotes, onChange]);

  const handleGetReferenceOptions = useCallback((columnKey: keyof CustomNote): ListCollection<DataDropdownItem> => {
    if (columnKey === "type") {
      return typeReferenceOptions;
    }
    else {
      throw new Error(`unknown type ${columnKey}`);
    }
  }, []);

  const handleAddRow = useCallback(() => {
    const newNotes: CustomNote[] = [
      ...customNotes,
      {
        id: v4(),
        name: "",
        type: "text",
        value: {},
      },
    ];

    onChange(newNotes);
  }, [customNotes, onChange]);

  const handleDeleteRow = useCallback((item: CustomNote) => {
    const newNotes: CustomNote[] = customNotes.filter(n => n.id !== item.id);
    onChange(newNotes);
  }, [customNotes, onChange]);

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
        items={customNotes}
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
