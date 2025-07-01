import CollapsibleSection from "@/components/CollapsibleSection";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { JSX } from "react";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { useModal } from "@/hooks/useModal";
import FeatureGroupEdit from "./FeatureGroupEdit";
import { SectionTitle } from "@/components/SectionTitle";
import CharacterFeaturesSection from "../characterFeature/CharacterFeaturesSection";
import CustomNotesSection from "@/features/general/notes/CustomNotesSection";

type FeatureGroupProps = {
  group: CharacterFeatureGroup;
};

const FeatureGroup = ({ group }: FeatureGroupProps): JSX.Element => {
  const {
    isOpen: isSectionDialogOpen,
    open: openSectionDialog,
    close: closeSectionDialog,
  } = useModal();

  return (
    <CollapsibleSection
      label={group.name}
      textStyle={"lg"}
      showEditButton
      onEditButtonClick={openSectionDialog}
    >
      <CustomNotesSection parentId={group.id} columnSpan={{ base: 12, md: 3 }} />
      <SectionTitle
        label="Features"
        textStyle={"sm"}
      />
      <CharacterFeaturesSection groupId={group.id} />
      {isSectionDialogOpen && (
        <SimpleDialog
          open={isSectionDialogOpen}
          onClose={closeSectionDialog}
          title={group.name}
        >
          <FeatureGroupEdit
            featureGroup={group}
          />
        </SimpleDialog>
      )}
    </CollapsibleSection>
  );
};

export default FeatureGroup;
