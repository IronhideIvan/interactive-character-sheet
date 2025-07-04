import CollapsibleSection from "@/components/CollapsibleSection";
import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { SectionTitle } from "@/components/SectionTitle";
import TextEditor from "@/components/TextEditor";
import { useModal } from "@/hooks/useModal";
import { JournalEntry } from "@/types/journal/journalEntry";
import { Box } from "@chakra-ui/react";
import { JSX, useState } from "react";

type JournalEntryFieldProps = {
  entry: JournalEntry;
  onChange: (newEntry: JournalEntry) => void;
};

const JournalEntryField = ({ entry, onChange }: JournalEntryFieldProps): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const [editName, setEditName] = useState("");
  const [editContents, setEditContents] = useState("");

  return (
    <CollapsibleSection
      label={entry.name}
      showEditButton
      onEditButtonClick={() => {
        setEditName(entry.name);
        setEditContents(entry.contents);
        open();
      }}
      textStyle={"md"}
    >
      <Box margin={4}>
        <MarkdownPreview source={entry.contents} />
      </Box>
      {isOpen && (
        <SimpleDialog
          title={entry.name}
          open={isOpen}
          onClose={close}
          actionButtonsType={ActionButtonType.SaveCancel}
          onSave={() => {
            onChange({
              ...entry,
              name: editName,
              contents: editContents,
            });
            close();
            setEditName("");
            setEditContents("");
          }}
        >
          <TextEditor label="Name" value={editName} onValueChange={newVal => setEditName(newVal)} />
          <SectionTitle label="Contents" />
          <MarkdownEditor value={editContents} onChange={newVal => setEditContents(newVal)} />
        </SimpleDialog>
      )}
    </CollapsibleSection>
  );
};

export default JournalEntryField;
