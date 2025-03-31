import { Box, defineStyle, Flex, Text } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";

type TextFieldProps = {
  label: string;
  floating?: boolean;
  children: ReactNode;
};

const FloatingLabel = ({ children, label, floating }: TextFieldProps): JSX.Element => {
  return (
    <Box display={"flex"} width={"100%"} height={"100%"}>
      <Box
        position={"relative"}
        display={"flex"}
        width={"100%"}
        height={"100%"}
      >
        <Box
          display={"flex"}
          width={"100%"}
          height={"100%"}
        >
          {children}
        </Box>
        <Flex css={floatingLabelStyles} transform={floating ? "translate(0, 50%)" : undefined}>
          <Box>
            <Text bg={"bg"} textStyle={"sm"}>{label}</Text>
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
});

export default FloatingLabel;
