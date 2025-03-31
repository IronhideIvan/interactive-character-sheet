import FloatingLabel from "@/components/FloatingLabel";
import { InfoTip } from "@/components/ToggleTip";
import { useAppSelector } from "@/redux/hooks";
import { Box, Flex, Text } from "@chakra-ui/react";
import { JSX } from "react";

const CharacterLevelWidget = (): JSX.Element => {
  const characterClasses = useAppSelector(state => state.basicInformation.latest.classes);

  let classSum = 0;
  characterClasses.forEach((c) => {
    classSum += c.level;
  });

  return (
    <FloatingLabel label="Character Level" floating>
      <Flex
        w={"100%"}
        h={"100%"}
        justifyContent={"center"}
        py={3}
        borderWidth={"1px"}
        borderColor={"border"}
        borderRadius={"md"}
      >
        <Text userSelect={"none"}>
          {classSum}
        </Text>
        <Box position={"absolute"} right={"4px"} top={0}>
          <InfoTip showArrow positioning={{ placement: "top" }}>
            <Text textStyle={"md"}>This is a calculated field</Text>
          </InfoTip>
        </Box>
      </Flex>
    </FloatingLabel>
  );
};

export default CharacterLevelWidget;
