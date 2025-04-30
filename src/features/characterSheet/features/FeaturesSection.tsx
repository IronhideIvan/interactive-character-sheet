import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Text, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import SectionTitle from "@/components/SectionTitle";
import { useModal } from "@/hooks/useModal";
import FeaturesSectionDrawer from "./sectionEdit/FeaturesSectionDrawer";
import { CharacterFeatureSection } from "@/types/character/characterFeature";
import { resetState, setCharacterFeatures } from "./characterFeaturesSlice";

const FeaturesSection = (): JSX.Element => {
  const characterFeatures = useAppSelector(state => state.characterFeatures.latest);
  const dispatch = useAppDispatch();
  const { isOpen, open, close } = useModal();

  const handleEditButtonClick = () => {
    open();
  };

  const handleChangeEverything = (updatedSections: CharacterFeatureSection[]) => {
    dispatch(setCharacterFeatures(updatedSections));
  };

  const handleResetEverything = () => {
    dispatch(resetState());
  };

  return (
    <VStack width={"100%"}>
      <SectionTitle
        label="Features"
        showEditButton
        onEditButtonClick={handleEditButtonClick}
      />
      <VStack>
        {characterFeatures.map((f) => {
          return (
            <Text key={f.id}>{f.name}</Text>
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
          onChangeSection={() => {
            console.log("CHANGE SECTION");
          }}
          onResetSection={() => {
            console.log("RESET SECTION");
          }}
        />
      )}
    </VStack>
  );
};

export default FeaturesSection;
