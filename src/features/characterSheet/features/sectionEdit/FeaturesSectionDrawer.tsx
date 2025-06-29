import FloatingDrawer from "@/components/FloatingDrawer";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { JSX, useMemo, useState } from "react";
import { useModal } from "@/hooks/useModal";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import FeatureGroupEdit from "../FeatureGroup/FeatureGroupEdit";
import { Box, VStack } from "@chakra-ui/react";
import { SectionTitle } from "@/components/SectionTitle";
import CharacterFeaturesDataSet from "./CharacterFeatureDataSet";
import FeaturesSectionDataSet from "./FeaturesSectionDataSet";
import { useAppSelector } from "@/redux/hooks";

type FeaturesSectionDrawerProps = {
  collectionId: string;
  open: boolean;
  onClose: () => void;
  onChangeEverything: (updatedSections: CharacterFeatureGroup[]) => void;
  onResetEverything: () => void;
};

const FeaturesSectionDrawer = ({
  collectionId,
  open,
  onClose,
}: FeaturesSectionDrawerProps): JSX.Element => {
  const allFeatureGroups = useAppSelector(state => state.featureGroups.latest);
  const collectionGroups = useMemo(() => allFeatureGroups.filter(fg => fg.collectionId === collectionId),
    [allFeatureGroups, collectionId]);
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

  const selectedSection: CharacterFeatureGroup | undefined = useMemo(() => {
    return selectedSectionId
      ? collectionGroups.find(cf => cf.id === selectedSectionId)
      : undefined;
  }, [collectionGroups, selectedSectionId]);

  return (
    <FloatingDrawer
      title={"Character Features"}
      size={"md"}
      open={open}
      onOpenChange={det => handleOpenChange(det.open)}
    >
      <VStack>
        <FeaturesSectionDataSet
          collectionId={collectionId}
        />
        {collectionGroups.map((s) => {
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
              <CharacterFeaturesDataSet groupId={s.id} />
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
          <FeatureGroupEdit
            featureGroup={selectedSection}
          />
        </SimpleDialog>
      )}
    </FloatingDrawer>
  );
};

export default FeaturesSectionDrawer;
