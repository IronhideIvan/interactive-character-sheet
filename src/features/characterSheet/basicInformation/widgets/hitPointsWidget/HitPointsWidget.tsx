import FloatingLabel from "@/components/FloatingLabel";
import StatusBar from "@/components/StatusBar";
import { useAppSelector } from "@/redux/hooks";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { JSX } from "react";

const HitPointsWidget = (): JSX.Element => {
  const characterHitPoints = useAppSelector(state => state.basicInformation.latest.hitPoints);

  return (
    <FloatingLabel label="Hit Points" floating>
      <Flex
        flex={"1"}
        height={"100%"}
        borderWidth={"1px"}
        borderColor={"border"}
        borderRadius={"md"}
        padding={1}
      >
        <VStack
          flex={"1"}
          rowGap={0}
        >
          <StatusBar max={characterHitPoints.max} current={{ value: characterHitPoints.current }} temp={{ value: characterHitPoints.temp }} />
          <Box zIndex={2} margin={-1.5}>
            <Text textStyle={"sm"}>
              {characterHitPoints.current}/{characterHitPoints.max}
              &nbsp;{characterHitPoints.temp > 0 ? "(Temp: ".concat(characterHitPoints.temp.toString()).concat(")") : undefined}
            </Text>
          </Box>
        </VStack>
      </Flex>
    </FloatingLabel>
  );
};

export default HitPointsWidget;
