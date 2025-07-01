import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { VStack } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { useModal } from "@/hooks/useModal";
import FeaturesSectionDrawer from "./sectionEdit/FeaturesSectionDrawer";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { resetState, setCharacterFeatures } from "./characterFeature/characterFeaturesSlice";
import FeatureGroup from "./FeatureGroup/FeatureGroup";
import { GroupCollection } from "@/types/common/groupCollection";
import CustomNotesSection from "@/features/general/notes/CustomNotesSection";

type FeatureGroupCollectionsSectionProps = {
  collection: GroupCollection;
};

const FeatureGroupCollectionsSection = ({ collection }: FeatureGroupCollectionsSectionProps): JSX.Element => {
  const allFeatureGroups = useAppSelector(state => state.featureGroups.latest);
  const collectionFeatureGroups = useMemo(() => allFeatureGroups.filter(fg => fg.collectionId === collection.id),
    [allFeatureGroups, collection]);

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

  return (
    <VStack width={"100%"}>
      <SectionTitle
        label={collection.name}
        textStyle={"xl"}
        showEditButton
        onEditButtonClick={handleEditButtonClick}
      />
      <CustomNotesSection parentId={collection.id} />
      <VStack width={"100%"} justifyContent={"center"}>
        {collectionFeatureGroups.map((f) => {
          return (
            <FeatureGroup key={f.id} group={f} />
          );
        })}
      </VStack>
      {isOpen && (
        <FeaturesSectionDrawer
          collectionId={collection.id}
          open={isOpen}
          onClose={close}
          onChangeEverything={handleChangeEverything}
          onResetEverything={handleResetEverything}
        />
      )}
    </VStack>
  );
};

export default FeatureGroupCollectionsSection;
