import FloatingLabelTextField from "@/components/FloatingLabelTextField";
import { JSX } from "react";
import { CustomNoteTextFieldProps } from "../customNoteFieldProps";

const CustomNoteTextField = ({ note, onChange }: CustomNoteTextFieldProps): JSX.Element => {
  const handleValueChange = (value: string) => {
    onChange({
      ...note,
      value: { string: value },
    });
  };

  return (
    <FloatingLabelTextField
      label={note.name}
      value={note.value.string ?? ""}
      onValueChange={handleValueChange}
    />
  );
};

export default CustomNoteTextField;
