import { JSX } from "react";
import { CustomNoteTextFieldProps } from "../customNoteFieldProps";
import TextEditor from "@/components/TextEditor";

const CustomNoteTextField = ({ note, onChange }: CustomNoteTextFieldProps): JSX.Element => {
  const handleValueChange = (value: string) => {
    onChange({
      ...note,
      value: { string: value },
    });
  };

  return (
    <TextEditor
      label={note.name}
      value={note.value.string ?? ""}
      onValueChange={handleValueChange}
    />
  );
};

export default CustomNoteTextField;
