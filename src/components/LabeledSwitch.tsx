import { Switch, Text } from "@chakra-ui/react";
import { JSX } from "react";

type LabeledSwitchProps = {
  label: string;
  value: boolean;
  onValueChanged: (newValue: boolean) => void;
};

const LabeledSwitch = ({ label, value, onValueChanged }: LabeledSwitchProps): JSX.Element => {
  return (
    <Switch.Root
      checked={value}
      onCheckedChange={e => onValueChanged(e.checked)}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}

    >
      <Switch.HiddenInput />
      <Switch.Label>
        <Text textAlign={"center"}>{label}</Text>
      </Switch.Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  );
};

export default LabeledSwitch;
