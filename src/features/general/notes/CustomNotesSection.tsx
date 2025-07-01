import { SectionTitle } from "@/components/SectionTitle";
import { Box, ConditionalValue, GridItem, SimpleGrid } from "@chakra-ui/react";
import { JSX, useCallback, useMemo } from "react";
import CustomNoteField from "./CustomNoteField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CustomNote } from "@/types/common/customNote";
import { upsertCustomNote } from "./customNotesSlice";

type CustomNotesSectionProps = {
  parentId: string;
  columnSpan?: ConditionalValue<number | "auto">;
};

const CustomNotesSection = ({ parentId, columnSpan }: CustomNotesSectionProps): JSX.Element => {
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
      <SimpleGrid
        gap={2}
        justifyContent={"center"}
        templateColumns={"repeat(12, 1fr)"}
        rowGap={4}
        width={"100%"}
      >
        {
          parentNotes.map((n) => {
            return (
              <GridItem key={n.id} colSpan={columnSpan ?? { base: 12 }}>
                <CustomNoteField
                  note={n}
                  onChange={(newNote) => {
                    updateNote(newNote);
                  }}
                />
              </GridItem>
            );
          })
        }
      </SimpleGrid>
    </Box>
  );
};

export default CustomNotesSection;
