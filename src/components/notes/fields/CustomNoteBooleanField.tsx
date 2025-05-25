import { JSX } from "react";
import { CustomNoteTextFieldProps } from "../customNoteFieldProps";
import LabeledSwitch from "@/components/LabeledSwitch";

const CustomNoteBooleanField = ({ note, onChange }: CustomNoteTextFieldProps): JSX.Element => {
  const handleValueChange = (newValue: boolean) => {
    onChange({
      ...note,
      value: { boolean: newValue },
    });
  };

  return (
    <LabeledSwitch
      label={note.name}
      value={note.value.boolean ?? false}
      onValueChanged={handleValueChange}
    />
  );
};

export default CustomNoteBooleanField;
