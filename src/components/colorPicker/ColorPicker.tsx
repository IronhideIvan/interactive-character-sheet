import { Color, ColorPicker, HStack, parseColor, Portal } from "@chakra-ui/react";
import { JSX } from "react";

type AppColorPickerProps = {
  color: Color;
  onColorChange: (color: Color) => void;
};

const AppColorPicker = ({ color, onColorChange }: AppColorPickerProps): JSX.Element => {
  return (
    <ColorPicker.Root
      format="hsla"
      defaultValue={parseColor("#eb5e41")}
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
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
};

export default AppColorPicker;
