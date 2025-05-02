import FloatingDrawer from "@/components/FloatingDrawer";
import { CharacterFeatureSection } from "@/types/character/characterFeature";
import { JSX, useMemo, useState } from "react";
import FeaturesSectionDataSet from "./FeaturesSectionDataSet";
import { useModal } from "@/hooks/useModal";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import CharacterFeatureEdit from "../characterFeatureEdit/CharacterFeatureEdit";
import { Box, VStack } from "@chakra-ui/react";
import SectionTitle from "@/components/SectionTitle";
import CharacterFeaturesDataSet from "./CharacterFeatureDataSet";

type FeaturesSectionDrawerProps = {
  open: boolean;
  characterFeatures: CharacterFeatureSection[];
  onClose: () => void;
  onChangeEverything: (updatedSections: CharacterFeatureSection[]) => void;
  onChangeSection: (updatedSection: CharacterFeatureSection) => void;
  onResetEverything: () => void;
  onResetSection: (section: CharacterFeatureSection) => void;
};

const FeaturesSectionDrawer = ({
  open,
  characterFeatures,
  onClose,
  onChangeEverything,
  onChangeSection,
  onResetEverything,
  onResetSection,
}: FeaturesSectionDrawerProps): JSX.Element => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>();
  const {
    isOpen: isSectionDialogOpen,
    open: openSectionDialog,
    close: closeSectionDialog,
  } = useModal();
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const selectedSection: CharacterFeatureSection | undefined = useMemo(() => {
    return selectedSectionId
      ? characterFeatures.find(cf => cf.id === selectedSectionId)
      : undefined;
  }, [characterFeatures, selectedSectionId]);

  return (
    <FloatingDrawer
      title={"Character Features"}
      size={"md"}
      open={open}
      onOpenChange={det => handleOpenChange(det.open)}
    >
      <VStack>
        <FeaturesSectionDataSet
          characterFeatures={characterFeatures}
          onChange={onChangeEverything}
          reset={onResetEverything}
        />
        {characterFeatures.map((s) => {
          return (
            <Box key={s.id}>
              <SectionTitle
                label={s.name}
                showEditButton
                onEditButtonClick={() => {
                  setSelectedSectionId(s.id);
                  openSectionDialog();
                }}
              />
              <CharacterFeaturesDataSet characterFeatures={s.features} />
            </Box>
          );
        })}
      </VStack>

      {isSectionDialogOpen && selectedSection && (
        <SimpleDialog
          open={isSectionDialogOpen}
          onClose={closeSectionDialog}
          title={selectedSection.name}
        >
          <CharacterFeatureEdit
            characterFeatureSection={selectedSection}
            onChange={onChangeSection}
            onRevert={() => {
              onResetSection(selectedSection);
            }}
          />
        </SimpleDialog>
      )}
    </FloatingDrawer>
  );
};

export default FeaturesSectionDrawer;
