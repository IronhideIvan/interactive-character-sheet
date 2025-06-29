import { JSX } from "react";
import { CustomNoteFieldProps } from "../customNoteFieldProps";
import NumberEditor from "@/components/NumberEditor";

const CustomNoteNumberField = ({ note, onChange }: CustomNoteFieldProps): JSX.Element => {
  const handleValueChange = (value: number) => {
    onChange({
      ...note,
      value: { number: value },
    });
  };

  return (
    <NumberEditor
      label={note.name}
      value={note.value.number ?? 0}
      onValueChange={handleValueChange}
    />
  );
};

export default CustomNoteNumberField;
