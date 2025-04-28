import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import TextEditor from "@/components/TextEditor";
import { Feature } from "@/types/data/feature";
import { Field, VStack } from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { JSX } from "react";
import rehypeSanitize from "rehype-sanitize";

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

  const handleDescriptionChange = (newValue: string) => {
    onChange({
      ...feature,
      description: newValue,
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
        <TextEditor
          label="Name"
          value={feature.name}
          onValueChange={handleNameChange}
        />
        <TextEditor
          label="Tooltip"
          value={feature.shortDescription}
          onValueChange={handleShortDescriptionChange}
        />
        <Field.Root height={"100%"} width={"100%"}>
          <Field.Label>Description</Field.Label>
          <MDEditor
            style={{ width: "100%" }}
            value={feature.description}
            onChange={(newValue) => {
              if (newValue) {
                handleDescriptionChange(newValue);
              }
            }}
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
            height={"100%"}
            visibleDragbar={false}
            minHeight={300}
          />
        </Field.Root>
      </VStack>
    </SimpleDialog>
  );
};

export default FeatureEditor;
