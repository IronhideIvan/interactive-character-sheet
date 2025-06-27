import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { VStack } from "@chakra-ui/react";
import { JSX } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { useModal } from "@/hooks/useModal";
import FeaturesSectionDrawer from "./sectionEdit/FeaturesSectionDrawer";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { resetCharacterFeature, resetState, setCharacterFeatures, upsertCharacterFeature } from "./characterFeaturesSlice";
import FeatureGroup from "./FeatureGroup/FeatureGroup";

const FeaturesSection = (): JSX.Element => {
  const characterFeatures = useAppSelector(state => state.characterFeatures.latest);
  const dispatch = useAppDispatch();
  const { isOpen, open, close } = useModal();

  const handleEditButtonClick = () => {
    open();
  };

  const handleChangeEverything = (updatedSections: CharacterFeatureGroup[]) => {
    dispatch(setCharacterFeatures(updatedSections));
  };

  const handleResetEverything = () => {
    dispatch(resetState());
  };

  const handleChangeSection = (updatedSection: CharacterFeatureGroup) => {
    dispatch(upsertCharacterFeature(updatedSection));
  };

  const handleResetSection = (section: CharacterFeatureGroup) => {
    dispatch(resetCharacterFeature(section));
  };

  return (
    <VStack width={"100%"}>
      <SectionTitle
        label="Feature Groups"
        showEditButton
        onEditButtonClick={handleEditButtonClick}
      />
      <VStack width={"100%"} justifyContent={"center"}>
        {characterFeatures.map((f) => {
          return (
            <FeatureGroup key={f.id} group={f} onChange={handleChangeSection} />
          );
        })}
      </VStack>
      {isOpen && (
        <FeaturesSectionDrawer
          characterFeatures={characterFeatures}
          open={isOpen}
          onClose={close}
          onChangeEverything={handleChangeEverything}
          onResetEverything={handleResetEverything}
          onChangeSection={handleChangeSection}
          onResetSection={handleResetSection}
        />
      )}
    </VStack>
  );
};

export default FeaturesSection;
