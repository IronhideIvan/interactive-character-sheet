import { Editable } from "@chakra-ui/react";
import { JSX } from "react";

type DataTextEditorProps = {
  value: string;
  placeholder?: string;
  onValueChanged: (value: string) => void;
};

const DataTextEditor = ({ value, onValueChanged, placeholder }: DataTextEditorProps): JSX.Element => {
  console.log(value);
  return (
    <Editable.Root
      value={value}
      placeholder={placeholder}
      onValueChange={(e) => {
        onValueChanged(e.value);
      }}
    >
      <Editable.Preview width="100%">
      </Editable.Preview>
      <Editable.Input width={"100%"} />
    </Editable.Root>
  );
};

export default DataTextEditor;
