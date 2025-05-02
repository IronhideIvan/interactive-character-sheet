import { useAppSelector } from "@/redux/hooks";
import { CharacterFeatureSection } from "@/types/character/characterFeature";
import { Feature } from "@/types/data/feature";
import { Field, Input, VStack } from "@chakra-ui/react";
import { JSX, useMemo, useState } from "react";
import CharacterFeatureEditDataSet from "./CharacterFeatureEditDataSet";
import FilteredFeaturesDataSet from "./FilteredFeaturesDataSet";
import cloneDeep from "lodash.clonedeep";
import { useModal } from "@/hooks/useModal";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { filterResultsBySearchTerm } from "@/utils/searchUtils";

type CharacterFeatureEditProps = {
  characterFeatureSection: CharacterFeatureSection;
  onChange: (updatedSection: CharacterFeatureSection) => void;
  onRevert: () => void;
};

const CharacterFeatureEdit = ({
  characterFeatureSection,
  onChange,
  onRevert,
}: CharacterFeatureEditProps): JSX.Element => {
  const allFeatures = useAppSelector(state => state.featuresDataSet.latest);
  const { isOpen: isFeatureDetailsOpen, open: openFeatureDetails, close: closeFeatureDetails } = useModal();
  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();
  const [filteredFeaturesList, setFilteredFeaturesList] = useState(allFeatures);
  const [searchTerm, setSearchTerm] = useState("");

  const sectionFeatures = useMemo(() =>
    allFeatures.filter(af => characterFeatureSection.features.findIndex(f => af.id === f.featureId) >= 0),
  [allFeatures, characterFeatureSection.features]);

  const handleAddFeature = (feature: Feature) => {
    const updatedSection = cloneDeep(characterFeatureSection);
    updatedSection.features = [
      ...updatedSection.features,
      { featureId: feature.id },
    ];
    onChange(updatedSection);
  };

  const handleRemoveFeature = (feature: Feature) => {
    const updatedSection = cloneDeep(characterFeatureSection);
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

  return (
    <VStack>
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
      <CharacterFeatureEditDataSet
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
          <MDEditor.Markdown
            style={{ width: "100%" }}
            source={selectedFeature.description}
            rehypePlugins={[rehypeSanitize]}
          />
        </SimpleDialog>
      )}
    </VStack>
  );
};

export default CharacterFeatureEdit;
