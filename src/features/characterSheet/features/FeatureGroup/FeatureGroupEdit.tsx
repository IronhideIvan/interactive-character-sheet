import { useAppSelector } from "@/redux/hooks";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";
import { Feature } from "@/types/data/feature";
import { Field, Input, VStack } from "@chakra-ui/react";
import { JSX, useCallback, useMemo, useState } from "react";
import FeatureGroupEditDataSet from "./FeatureGroupEditDataSet";
import FilteredFeaturesDataSet from "./FilteredFeaturesDataSet";
import cloneDeep from "lodash.clonedeep";
import { useModal } from "@/hooks/useModal";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { filterResultsBySearchTerm } from "@/utils/searchUtils";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { SectionTitle } from "@/components/SectionTitle";
import CustomNotesManager from "@/components/notes/CustomNotesManager";
import { CustomNote } from "@/types/common/customNote";
import TextEditor from "@/components/TextEditor";

type FeatureGroupEditProps = {
  featureGroup: CharacterFeatureGroup;
  onChange: (updatedSection: CharacterFeatureGroup) => void;
  onRevertFeatureList?: () => void;
};

const FeatureGroupEdit = ({
  featureGroup,
  onChange,
  onRevertFeatureList: onRevert,
}: FeatureGroupEditProps): JSX.Element => {
  const allFeatures = useAppSelector(state => state.featuresDataSet.latest);
  const { isOpen: isFeatureDetailsOpen, open: openFeatureDetails, close: closeFeatureDetails } = useModal();
  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();
  const [filteredFeaturesList, setFilteredFeaturesList] = useState(allFeatures);
  const [searchTerm, setSearchTerm] = useState("");

  const sectionFeatures = useMemo(() =>
    allFeatures.filter(af => featureGroup.features.findIndex(f => af.id === f.featureId) >= 0),
  [allFeatures, featureGroup.features]);

  const handleAddFeature = (feature: Feature) => {
    const updatedSection = cloneDeep(featureGroup);
    updatedSection.features = [
      ...updatedSection.features,
      { featureId: feature.id },
    ];
    onChange(updatedSection);
  };

  const handleRemoveFeature = (feature: Feature) => {
    const updatedSection = cloneDeep(featureGroup);
    updatedSection.features = updatedSection.features.filter(f => f.featureId !== feature.id);
    onChange(updatedSection);
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

  const handleNotesChange = useCallback((newNotes: CustomNote[]) => {
    onChange({
      ...featureGroup,
      notes: newNotes,
    });
  }, [featureGroup, onChange]);

  const handleNameChange = (newValue: string) => {
    onChange({
      ...featureGroup,
      name: newValue,
    });
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
      <CustomNotesManager
        customNotes={featureGroup.notes ?? []}
        onChange={handleNotesChange}
      />
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
        onRevertAllChanges={onRevert}
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
