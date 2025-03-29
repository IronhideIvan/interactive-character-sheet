import { Box, defineStyle, Field, Input, InputProps, Text } from "@chakra-ui/react";
import { JSX } from "react";

type TextFieldProps = {
  value: string;
  label: string;
  onValueChange: (value: string) => void;
} & InputProps;

const ImportantTextField = ({ value, label, onValueChange, ...props }: TextFieldProps): JSX.Element => {
  return (
    <Field.Root>
      <Box pos="relative" w="full">
        <Input
          {...props}
          className="peer"
          placeholder=""
          value={value}
          onChange={e => onValueChange(e.target.value)}
        />
        <Field.Label css={floatingStyles}>
          <Text padding={"2px"} bg={"bg"}>{label}</Text>
        </Field.Label>
      </Box>
    </Field.Root>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  pointerEvents: "none",
  fontWeight: "normal",
  transition: "transform",
  color: "fg.muted",
  transform: "translate(0, -50%)",
  _peerPlaceholderShown: {
    color: "fg.muted",
    transform: "translate(0, -100%)",
  },
  _peerFocusVisible: {
    color: "fg",
    transform: "translate(0, -50%)",
  },
});

export default ImportantTextField;
