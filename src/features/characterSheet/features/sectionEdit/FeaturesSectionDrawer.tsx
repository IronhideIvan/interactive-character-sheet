import FloatingDrawer from "@/components/FloatingDrawer";
import { CharacterFeatureSection } from "@/types/character/characterFeature";
import { JSX } from "react";
import FeaturesSectionDataSet from "./FeaturesSectionDataSet";

type FeaturesSectionDrawerProps = {
  open: boolean;
  characterFeatures: CharacterFeatureSection[];
  onClose: () => void;
  onChangeEverything: (updatedSections: CharacterFeatureSection[]) => void;
  onChangeSection: (updatedSection: CharacterFeatureSection[]) => void;
  onResetEverything: () => void;
  onResetSection: (section: CharacterFeatureSection) => void;
};

const FeaturesSectionDrawer = ({
  open,
  characterFeatures,
  onClose,
  onChangeEverything,
  // onChangeSection,
  onResetEverything,
  // onResetSection,
}: FeaturesSectionDrawerProps): JSX.Element => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <FloatingDrawer
      title={"Character Features"}
      size={"md"}
      open={open}
      onOpenChange={det => handleOpenChange(det.open)}
    >
      <FeaturesSectionDataSet
        characterFeatures={characterFeatures}
        onChange={onChangeEverything}
        reset={onResetEverything}
      />
    </FloatingDrawer>
  );
};

export default FeaturesSectionDrawer;
