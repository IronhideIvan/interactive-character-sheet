import { Field, NumberInput } from "@chakra-ui/react";
import { JSX } from "react";

type NumberEditorProps = {
  label: string;
  value: number;
  onValueChange: (newValue: number) => void;
};

const NumberEditor = ({ value, label, onValueChange }: NumberEditorProps): JSX.Element => {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <NumberInput.Root
        width={"100%"}
        allowMouseWheel
        value={value.toString()}
        onValueChange={e => onValueChange(e.valueAsNumber)}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field.Root>
  );
};

export default NumberEditor;
