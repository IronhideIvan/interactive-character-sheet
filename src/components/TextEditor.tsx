import { Field, Input, InputProps } from "@chakra-ui/react";
import { JSX } from "react";

type TextEditorProps = {
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
} & InputProps;

const TextEditor = ({
  value, label, onValueChange, ...props
}: TextEditorProps): JSX.Element => {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Input
        {...props}
        width={"100%"}
        value={value.toString()}
        onChange={e => onValueChange(e.target.value)}
      />
    </Field.Root>
  );
};

export default TextEditor;
