import { Flex, FlexProps } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";

type WidgetPaperProps = {
  children?: ReactNode;
} & FlexProps;

const WidgetPaper = ({ children, ...props }: WidgetPaperProps): JSX.Element => {
  return (
    <Flex
      {...props}
      w={props.w ?? "100%"}
      h={props.h ?? "100%"}
      justifyContent={props.justifyContent ?? "center"}
      py={props.py ?? 3}
      borderWidth={props.borderWidth ?? "1px"}
      borderColor={props.borderColor ?? "border"}
      borderRadius={props.borderRadius ?? "md"}
    >
      {children}
    </Flex>
  );
};

export default WidgetPaper;
