import { Editable } from "@chakra-ui/react";
import { JSX } from "react";

type InlineTextEditorProps = {
  value: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
};

const InlineTextEditor = (props: InlineTextEditorProps): JSX.Element => {
  return (
    <Editable.Root
      value={props.value}
      placeholder={props.placeholder}
      onValueChange={(e) => {
        props.onChange(e.value);
      }}
      borderWidth={1}
      borderRadius={5}
    >
      <Editable.Preview width="100%">
      </Editable.Preview>
      <Editable.Input width={"100%"} />
    </Editable.Root>
  );
};

export default InlineTextEditor;
