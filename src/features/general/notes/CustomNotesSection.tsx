import { SectionTitle } from "@/components/SectionTitle";
import { Box } from "@chakra-ui/react";
import { JSX, useCallback, useMemo } from "react";
import CustomNoteField from "./CustomNoteField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CustomNote } from "@/types/common/customNote";
import { upsertCustomNote } from "./customNotesSlice";

type CustomNotesSectionProps = {
  parentId: string;
};

const CustomNotesSection = ({ parentId }: CustomNotesSectionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const allNotes = useAppSelector(state => state.customNotes.latest);
  const parentNotes = useMemo(() => {
    return allNotes.filter(n => n.parentId === parentId);
  }, [allNotes, parentId]);

  const updateNote = useCallback((newNote: CustomNote) => {
    dispatch(upsertCustomNote(newNote));
  }, [dispatch]);

  if (parentNotes.length === 0) {
    return <></>;
  }

  return (
    <Box width={"100%"}>
      <SectionTitle
        label="Notes"
        textStyle={"sm"}
      />
      {
        parentNotes.map((n) => {
          return (
            <CustomNoteField
              key={n.id}
              note={n}
              onChange={(newNote) => {
                updateNote(newNote);
              }}
            />
          );
        })
      }
    </Box>
  );
};

export default CustomNotesSection;
