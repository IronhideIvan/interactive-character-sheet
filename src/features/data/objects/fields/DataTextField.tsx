import { JSX } from "react";
import TextEditor from "@/components/TextEditor";
import { DataFieldProps } from "../dataFieldProps";

const DataTextField = ({ data, hideLabel, onChange }: DataFieldProps): JSX.Element => {
  const handleValueChange = (value: string) => {
    onChange({
      ...data,
      value: { string: value },
    });
  };

  return (
    <TextEditor
      label={!hideLabel ? data.name : ""}
      value={data.value.string ?? ""}
      onValueChange={handleValueChange}
    />
  );
};

export default DataTextField;
