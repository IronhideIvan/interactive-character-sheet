import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { v4 } from "uuid";
import DataGrid from "@/components/dataGrid/DataGrid";
import { EditorType } from "@/components/dataGrid/dataGridTypes";
import { JournalEntry } from "@/types/journal/journalEntry";
import { deleteJournalEntry, resetState, upsertJournalEntry } from "@/features/journal/journalEntriesSlice";

const JournalEntriesDataset = (): JSX.Element => {
  const collections = useAppSelector(state => state.journalEntries.latest);
  const dispatch = useAppDispatch();

  const handleGetId = (item: JournalEntry) => {
    return item.id;
  };

  const handleStringValueChanged = (item: JournalEntry, columnKey: keyof JournalEntry, value: string) => {
    let newItem: JournalEntry | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertJournalEntry(newItem));
    }
  };

  const handleAddRow = () => {
    dispatch(upsertJournalEntry({
      id: v4(),
      name: "",
      contents: "",
    }));
  };

  const handleDeleteRow = (item: JournalEntry) => {
    dispatch(deleteJournalEntry(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetState());
  };

  const handleGetFriendlyName = (item: JournalEntry) => {
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

export default JournalEntriesDataset;
