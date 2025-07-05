import { Text, TextStyle } from "@chakra-ui/react";
import { JSX } from "react";
import { TextStyleType } from "./textStyles";

type LinkingTextProps = {
  text: string;
  style?: TextStyleType;
};

const LinkingText = ({ text }: LinkingTextProps): JSX.Element => {
  return <Text textStyle={defaultStyles}>{text}</Text>;
};

export default LinkingText;

const defaultStyles: TextStyle = { textDecorationColor: "blue" };
