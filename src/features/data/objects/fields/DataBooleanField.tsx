import { JSX } from "react";
import LabeledSwitch from "@/components/LabeledSwitch";
import { DataFieldProps } from "../dataFieldProps";

const DataBooleanField = ({ data, hideLabel, onChange }: DataFieldProps): JSX.Element => {
  const handleValueChange = (newValue: boolean) => {
    onChange({
      ...data,
      value: { boolean: newValue },
    });
  };

  return (
    <LabeledSwitch
      label={!hideLabel ? data.name : ""}
      value={data.value.boolean ?? false}
      onValueChanged={handleValueChange}
    />
  );
};

export default DataBooleanField;
