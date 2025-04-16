import { HStack, Separator, Text } from "@chakra-ui/react";
import { JSX } from "react";

type SectionTitleProps = {
  label: string;
};

const SectionTitle = ({ label }: SectionTitleProps): JSX.Element => {
  return (
    <HStack width={"100%"}>
      <Separator flex={"1"} />
      <Text flexShrink={"0"}>{label}</Text>
      <Separator flex={"1"} />
    </HStack>
  );
};

export default SectionTitle;
