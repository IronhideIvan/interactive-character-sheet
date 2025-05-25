import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import TagsEditor from "@/components/TagsEditor";
import TextEditor from "@/components/TextEditor";
import { Feature } from "@/types/data/feature";
import { Field, VStack } from "@chakra-ui/react";
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

  const handleCaptionChange = (newValue: string) => {
    onChange({
      ...feature,
      caption: newValue,
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

  const handleTagsChange = (newValue: string[]) => {
    onChange({
      ...feature,
      tags: [...newValue],
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
          value={feature.name ?? ""}
          onValueChange={handleNameChange}
        />
        <TextEditor
          label="Caption"
          value={feature.caption ?? ""}
          onValueChange={handleCaptionChange}
        />
        <TextEditor
          label="Short Description"
          value={feature.shortDescription ?? ""}
          onValueChange={handleShortDescriptionChange}
        />
        <TagsEditor
          label="Tags"
          value={feature.tags ?? []}
          onValueChange={handleTagsChange}
        />
        <Field.Root height={"100%"} width={"100%"}>
          <Field.Label>Description</Field.Label>
          <MarkdownEditor
            value={feature.description}
            onChange={(newValue) => {
              handleDescriptionChange(newValue);
            }}
          />
        </Field.Root>
      </VStack>
    </SimpleDialog>
  );
};

export default FeatureEditor;
