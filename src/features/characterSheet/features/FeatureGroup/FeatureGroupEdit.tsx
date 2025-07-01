import { useAppSelector } from "@/redux/hooks";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { Feature } from "@/types/data/feature";
import { Field, Input, VStack } from "@chakra-ui/react";
import { JSX, useMemo, useState } from "react";
import FeatureGroupEditDataSet from "./FeatureGroupEditDataSet";
import FilteredFeaturesDataSet from "./FilteredFeaturesDataSet";
import { useModal } from "@/hooks/useModal";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { filterResultsBySearchTerm } from "@/utils/searchUtils";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { SectionTitle } from "@/components/SectionTitle";
import CustomNotesManager from "@/features/general/notes/CustomNotesManager";
import TextEditor from "@/components/TextEditor";
import { useDispatch } from "react-redux";
import { deleteCharacterFeature, upsertCharacterFeature } from "../characterFeature/characterFeaturesSlice";
import { v4 } from "uuid";
import { upsertCharacterFeatureGroup } from "./featureGroupsSlice";

type FeatureGroupEditProps = {
  featureGroup: CharacterFeatureGroup;
};

const FeatureGroupEdit = ({ featureGroup }: FeatureGroupEditProps): JSX.Element => {
  const dispatch = useDispatch();
  const { isOpen: isFeatureDetailsOpen, open: openFeatureDetails, close: closeFeatureDetails } = useModal();
  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const allCharacterFeatures = useAppSelector(state => state.characterFeatures.latest);
  const groupCharacterFeatures = useMemo(() => {
    return allCharacterFeatures.filter(cf => cf.groupId === featureGroup.id);
  }, [allCharacterFeatures, featureGroup.id]);

  const allFeatures = useAppSelector(state => state.featuresDataSet.latest);
  const [filteredFeaturesList, setFilteredFeaturesList] = useState(allFeatures);
  const sectionFeatures = useMemo(() =>
    allFeatures.filter(af => groupCharacterFeatures.findIndex(f => af.id === f.featureId) >= 0),
  [allFeatures, groupCharacterFeatures]);

  const handleAddFeature = (feature: Feature) => {
    dispatch(upsertCharacterFeature({
      id: v4(),
      groupId: featureGroup.id,
      featureId: feature.id,
    }));
  };

  const handleRemoveFeature = (feature: Feature) => {
    const existingFeature = groupCharacterFeatures.find(cf => cf.featureId === feature.id);
    if (existingFeature) {
      dispatch(deleteCharacterFeature(existingFeature.id));
    }
  };

  const handleViewFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    openFeatureDetails();
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);

    if (term.length === 0) {
      setFilteredFeaturesList(allFeatures);
      return;
    }

    const results: Feature[] = [];
    results.push(...filterResultsBySearchTerm({
      searchTerm: term,
      source: allFeatures,
      getString: item => item.name,
    }));

    setFilteredFeaturesList(results);
  };

  const handleNameChange = (newValue: string) => {
    dispatch(upsertCharacterFeatureGroup({
      ...featureGroup,
      name: newValue,
    }));
  };

  return (
    <VStack>
      <SectionTitle label="Basic Information" />
      <TextEditor
        label="Name"
        value={featureGroup.name ?? ""}
        onValueChange={handleNameChange}
      />
      <SectionTitle label="Notes" />
      <CustomNotesManager parentId={featureGroup.id} />
      <SectionTitle label="Features" />
      <Field.Root maxWidth={"20rem"}>
        <Field.Label>Search</Field.Label>
        <Input
          value={searchTerm}
          onChange={(e) => {
            handleSearchTermChange(e.target.value);
          }}
          placeholder="Fighting Style"
        />
      </Field.Root>
      <FeatureGroupEditDataSet
        characterFeatures={sectionFeatures}
      />
      <FilteredFeaturesDataSet
        characterFeatures={sectionFeatures}
        allFeatures={filteredFeaturesList}
        onAdd={handleAddFeature}
        onRemove={handleRemoveFeature}
        onView={handleViewFeature}
      />
      {isFeatureDetailsOpen && selectedFeature && (
        <SimpleDialog
          open={isFeatureDetailsOpen}
          title={selectedFeature.name}
          onClose={closeFeatureDetails}
        >
          <MarkdownPreview source={selectedFeature.description} />
        </SimpleDialog>
      )}
    </VStack>
  );
};

export default FeatureGroupEdit;
