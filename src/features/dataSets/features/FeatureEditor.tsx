import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import FloatingLabelTextField from "@/components/FloatingLabelTextField";
import { Feature } from "@/types/data/feature";
import { VStack } from "@chakra-ui/react";
import { JSX } from "react";

type FeatureEditorProps = {
  feature: Feature;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (updatedFeature: Feature) => void;
};

const FeatureEditor = ({
  feature, isOpen, onClose, onCancel, onSave, onChange,
}: FeatureEditorProps): JSX.Element => {
  const handleNameChange = (newValue: string) => {
    onChange({
      ...feature,
      name: newValue,
    });
  };

  const handleShortDescriptionChange = (newValue: string) => {
    onChange({
      ...feature,
      shortDescription: newValue,
    });
  };

  return (
    <SimpleDialog
      open={isOpen}
      title={`Feature: ${feature.name}`}
      onClose={onClose}
      onSave={() => onSave()}
      onCancel={onCancel}
      actionButtonsType={ActionButtonType.SaveCancel}
    >
      <VStack gap={6}>
        <FloatingLabelTextField
          label="Name"
          textAlign={"center"}
          value={feature.name}
          onValueChange={handleNameChange}
        />
        <FloatingLabelTextField
          label="Tooltip"
          value={feature.shortDescription}
          onValueChange={handleShortDescriptionChange}
        />
      </VStack>
    </SimpleDialog>
  );
};

export default FeatureEditor;
