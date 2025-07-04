import { JSX } from "react";
import { Switch } from "@chakra-ui/react";

type DataBooleanEditorProps = {
  value: boolean;
  onValueChanged: (value: boolean) => void;
  readonly?: boolean;
};

const DataBooleanEditor = ({ value, onValueChanged, readonly }: DataBooleanEditorProps): JSX.Element => {
  return (
    <Switch.Root
      checked={value}
      onCheckedChange={e => onValueChanged(e.checked)}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      readOnly={readonly}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  );
};

export default DataBooleanEditor;
