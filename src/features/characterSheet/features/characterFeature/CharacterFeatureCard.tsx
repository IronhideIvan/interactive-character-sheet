import SimpleDialog from "@/components/dialog/SimpleDialog";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import CustomNoteField from "@/components/notes/CustomNoteField";
import CustomNotesManager from "@/components/notes/CustomNotesManager";
import { SectionTitle } from "@/components/SectionTitle";
import WidgetPaper from "@/components/WidgetPaper";
import { useModal } from "@/hooks/useModal";
import { CharacterFeature } from "@/types/character/characterFeature";
import { CustomNote } from "@/types/common/customNote";
import { Feature } from "@/types/data/feature";
import { upsert } from "@/utils/arrayUtils";
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { JSX, useCallback } from "react";
import { FaEye } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

type CharacterFeatureCardProps = {
  feature: Feature;
  characterFeature: CharacterFeature;
  onChange: (updatedCharacterFeature: CharacterFeature) => void;
};

const CharacterFeatureCard = ({ feature, characterFeature, onChange }: CharacterFeatureCardProps): JSX.Element => {
  const { isOpen: isFeatureDetailsOpen, open: openFeatureDetails, close: closeFeatureDetails } = useModal();
  const { isOpen: isNotesManagerOpen, open: openNotesManager, close: closeNotesManager } = useModal();

  const handleSingleNoteChange = useCallback((updatedNote: CustomNote) => {
    const currentNotes = characterFeature.notes ?? [];
    onChange({
      ...characterFeature,
      notes: upsert(updatedNote, [...currentNotes], item => item.id === updatedNote.id),
    });
  }, [characterFeature, onChange]);

  const handleAllNotesChange = useCallback((newNotes: CustomNote[]) => {
    onChange({
      ...characterFeature,
      notes: newNotes,
    });
  }, [characterFeature, onChange]);

  return (
    <WidgetPaper pos={"relative"}>
      <IconButton
        size={"sm"}
        variant={"ghost"}
        rounded={"full"}
        pos={"absolute"}
        left={2}
        top={2}
        onClick={() => {
          openNotesManager();
        }}
      >
        <FaNoteSticky />
      </IconButton>
      <IconButton
        size={"sm"}
        variant={"ghost"}
        rounded={"full"}
        pos={"absolute"}
        right={2}
        top={2}
        onClick={() => {
          openFeatureDetails();
        }}
      >
        <FaEye />
      </IconButton>
      <VStack p={2} width={"100%"}>
        <Text>{feature.name}</Text>
        <Text>{feature.caption}</Text>
        <Text textAlign={"center"}>{feature.shortDescription}</Text>
        {characterFeature.notes && characterFeature.notes.length > 0 && (
          <>
            <SectionTitle
              label="Notes"
              textStyle={"sm"}
            />
            {
              characterFeature.notes.map((n) => {
                return (
                  <CustomNoteField
                    key={n.id}
                    note={n}
                    onChange={(newNote) => {
                      handleSingleNoteChange(newNote);
                    }}
                  />
                );
              })
            }
          </>
        )}
      </VStack>
      {isFeatureDetailsOpen && (
        <SimpleDialog
          open={isFeatureDetailsOpen}
          title={feature.name}
          onClose={closeFeatureDetails}
        >
          <MarkdownPreview source={feature.description} />
        </SimpleDialog>
      )}
      {isNotesManagerOpen && (
        <SimpleDialog
          open={isNotesManagerOpen}
          title={`${feature.name} - Notes`}
          onClose={closeNotesManager}
        >
          <CustomNotesManager
            customNotes={characterFeature.notes ?? []}
            onChange={handleAllNotesChange}
          />
        </SimpleDialog>
      )}

    </WidgetPaper>
  );
};

export default CharacterFeatureCard;
