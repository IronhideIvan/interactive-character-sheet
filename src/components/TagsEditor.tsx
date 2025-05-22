import { JSX } from "react";
import TextEditor from "./TextEditor";

type TagsEditorProps = {
  label: string;
  value: string[];
  onValueChange: (newTags: string[]) => void;
};

const TagsEditor = ({ label, value, onValueChange }: TagsEditorProps): JSX.Element => {
  const handleValueChanged = (strVal: string): void => {
    onValueChange(strVal.split(",").map(s => s.trim()));
  };

  return <TextEditor label={label} value={value.join(", ")} onValueChange={handleValueChanged} />;
};

export default TagsEditor;
