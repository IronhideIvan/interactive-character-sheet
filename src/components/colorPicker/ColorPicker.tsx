import { Color, ColorPicker, HStack } from "@chakra-ui/react";
import { JSX } from "react";

type AppColorPickerProps = {
  color: Color;
  defaultColor?: Color;
  onColorChange: (color: Color) => void;
};

const AppColorPicker = ({ color, onColorChange, defaultColor }: AppColorPickerProps): JSX.Element => {
  return (
    <ColorPicker.Root
      format="hsla"
      defaultValue={defaultColor}
      maxW="200px"
      value={color}
      onValueChange={e => onColorChange(e.value)}
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <HStack>
            <ColorPicker.EyeDropper size="xs" variant="outline" />
            <ColorPicker.Sliders />
          </HStack>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.Root>
  );
};

export default AppColorPicker;
