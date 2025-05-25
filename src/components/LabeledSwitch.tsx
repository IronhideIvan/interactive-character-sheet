import { Switch } from "@chakra-ui/react";
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
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>{label}</Switch.Label>
    </Switch.Root>
  );
};

export default LabeledSwitch;
