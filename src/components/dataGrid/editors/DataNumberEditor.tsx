import { NumberInput } from "@chakra-ui/react";
import { JSX } from "react";

type DataNumberEditorProps = {
  value: number;
  onValueChanged: (value: number) => void;
};

const DataNumberEditor = ({ value, onValueChanged }: DataNumberEditorProps): JSX.Element => {
  return (
    <NumberInput.Root
      width={"100%"}
      value={value.toString()}
      onValueChange={e => onValueChanged(parseInt(e.value))}
      allowMouseWheel
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
};

export default DataNumberEditor;
