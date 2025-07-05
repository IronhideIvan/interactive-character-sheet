import { JSX } from "react";
import NumberEditor from "@/components/NumberEditor";
import { DataFieldProps } from "../dataFieldProps";

const DataNumberField = ({ data, hideLabel, onChange }: DataFieldProps): JSX.Element => {
  const handleValueChange = (value: number) => {
    onChange({
      ...data,
      value: { number: value },
    });
  };

  return (
    <NumberEditor
      label={!hideLabel ? data.name : ""}
      value={data.value.number ?? 0}
      onValueChange={handleValueChange}
    />
  );
};

export default DataNumberField;
