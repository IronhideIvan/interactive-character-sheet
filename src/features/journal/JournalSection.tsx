import { SectionTitle } from "@/components/SectionTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { JSX } from "react";
import JournalEntryField from "./JournalEntryField";
import { JournalEntry } from "@/types/journal/journalEntry";
import { upsertJournalEntry } from "./journalEntriesSlice";
import { Box, VStack } from "@chakra-ui/react";

const JournalSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const entries = useAppSelector(state => state.journalEntries.latest);

  const handleUpdateEntry = (newEntry: JournalEntry) => {
    dispatch(upsertJournalEntry(newEntry));
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      paddingBottom={10}
    >
      <SectionTitle label="Journal" textStyle={"xl"} />
      <VStack>
        {entries.map((e) => {
          return (
            <JournalEntryField key={e.id} entry={e} onChange={handleUpdateEntry} />
          );
        })}
      </VStack>
    </Box>
  );
};

export default JournalSection;
