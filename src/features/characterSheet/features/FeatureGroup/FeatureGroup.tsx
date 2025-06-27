import CollapsibleSection from "@/components/CollapsibleSection";
import { useFeatureFinder } from "@/hooks/useFeatureFinder";
import { CharacterFeature, CharacterFeatureGroup } from "@/types/character/characterFeature";
import { JSX, useCallback } from "react";
import CharacterFeatureCard from "../characterFeature/CharacterFeatureCard";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { upsert } from "@/utils/arrayUtils";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { useModal } from "@/hooks/useModal";
import FeatureGroupEdit from "./FeatureGroupEdit";
import { SectionTitle } from "@/components/SectionTitle";
import CustomNoteField from "@/components/notes/CustomNoteField";
import { CustomNote } from "@/types/common/customNote";

type FeatureGroupProps = {
  group: CharacterFeatureGroup;
  onChange: (updatedGroup: CharacterFeatureGroup) => void;
};

const FeatureGroup = ({ group, onChange }: FeatureGroupProps): JSX.Element => {
  const { findFeature } = useFeatureFinder();
  const {
    isOpen: isSectionDialogOpen,
    open: openSectionDialog,
    close: closeSectionDialog,
  } = useModal();

  const handleCharacterFeatureChange = useCallback((updatedCharFeature: CharacterFeature) => {
    onChange({
      ...group,
      features: upsert(
        updatedCharFeature,
        [...group.features],
        item => item.featureId === updatedCharFeature.featureId,
      ),
    });
  }, [group, onChange]);

  const handleGroupChange = useCallback((newGroup: CharacterFeatureGroup) => {
    onChange(newGroup);
  }, [onChange]);

  const handleSingleNoteChange = useCallback((updatedNote: CustomNote) => {
    const currentNotes = group.notes ?? [];
    onChange({
      ...group,
      notes: upsert(updatedNote, [...currentNotes], item => item.id === updatedNote.id),
    });
  }, [group, onChange]);

  return (
    <CollapsibleSection label={group.name} showEditButton onEditButtonClick={openSectionDialog}>
      {group.notes && group.notes.length > 0 && (
        <>
          <SectionTitle
            label="Notes"
            textStyle={"sm"}
          />
          <SimpleGrid
            gap={2}
            mt={2}
            justifyContent="center"
            templateColumns="repeat(12, 1fr)"
            rowGap={4}
          >
            {
              group.notes.map((n) => {
                return (
                  <GridItem key={n.id} colSpan={{ base: 12, sm: 6, md: 4 }} maxWidth={"20rem"}>
                    <CustomNoteField
                      note={n}
                      onChange={(newNote) => {
                        handleSingleNoteChange(newNote);
                      }}
                    />
                  </GridItem>
                );
              })
            }
          </SimpleGrid>
          <SectionTitle
            label="Features"
            textStyle={"sm"}
          />
        </>
      )}
      <SimpleGrid
        gap={2}
        mt={2}
        justifyContent="center"
        templateColumns="repeat(12, 1fr)"
        rowGap={4}
      >
        {group.features.map((cf) => {
          const data = findFeature(cf.featureId);
          if (data) {
            return (
              <GridItem key={cf.featureId} colSpan={{ base: 12, sm: 6, md: 4 }} maxWidth={"20rem"}>
                <CharacterFeatureCard
                  feature={data}
                  characterFeature={cf}
                  onChange={handleCharacterFeatureChange}
                />
              </GridItem>
            );
          }
          else {
            return <></>;
          }
        })}
      </SimpleGrid>
      {isSectionDialogOpen && (
        <SimpleDialog
          open={isSectionDialogOpen}
          onClose={closeSectionDialog}
          title={group.name}
        >
          <FeatureGroupEdit
            featureGroup={group}
            onChange={handleGroupChange}
          />
        </SimpleDialog>
      )}
    </CollapsibleSection>
  );
};

export default FeatureGroup;
