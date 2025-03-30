import { CharacterClass } from "@/types/character/characterClass";
import { Box, Button, defineStyle, Flex, Text, TextProps } from "@chakra-ui/react";
import { JSX, useMemo } from "react";

type EditClassesFieldProps = {
  classes: CharacterClass[];
  onClick: () => void;
} & TextProps;

const EditClassesField = ({ classes, onClick, ...textProps }: EditClassesFieldProps): JSX.Element => {
  const displayValue: string = useMemo(() => {
    let classText = "";
    for (const c of classes) {
      if (c.name.length === 0 || c.level === 0) {
        continue;
      }

      if (classText.length > 0) {
        classText = classText.concat(", ");
      }

      classText = classText.concat(`${c.name} ${c.level}`);
    }

    return classText;
  }, [classes]);

  return (
    <Box display={"flex"} width={"100%"} height={"100%"}>
      <Box
        position={"relative"}
        display={"flex"}
        width={"100%"}
        height={"100%"}
      >
        <Button
          width={"100%"}
          height={"100%"}
          variant={"outline"}
          onClick={onClick}
        >
          <Text {...textProps}>
            {displayValue}
          </Text>
        </Button>
        <Flex css={floatingLabelStyles} transform={displayValue.length > 0 ? "translate(0, 50%)" : undefined}>
          <Box>
            <Text bg={"bg"} textStyle={"sm"}>Class & Level</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const floatingLabelStyles = defineStyle({
  pos: "absolute",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
  fontWeight: "normal",
  transition: "transform",
  color: "fg",
  userSelect: "none",
  // transform: "translate(0, -50%)",
  // _peerPlaceholderShown: {
  //   color: "fg.muted",
  //   transform: "translate(0, -100%)",
  // }
});

export default EditClassesField;
