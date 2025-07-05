import { NumberInput } from "@chakra-ui/react";
import { JSX } from "react";

type InlineNumberEditorProps = {
  value: number;
  onValueChanged: (value: number) => void;
};

const InlineNumberEditor = ({ value, onValueChanged }: InlineNumberEditorProps): JSX.Element => {
  return (
    <NumberInput.Root
      width={"100%"}
      value={value.toString()}
      onValueChange={e => onValueChanged(e.valueAsNumber)}
      allowMouseWheel
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
};

export default InlineNumberEditor;
