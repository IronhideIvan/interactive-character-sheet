import FloatingDrawer from "@/components/FloatingDrawer";
import FloatingLabel from "@/components/FloatingLabel";
import StatusBar from "@/components/StatusBar";
import { useModal } from "@/hooks/useModal";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import HitPointsEditor from "./HitPointsEditor";

const HitPointsWidget = (): JSX.Element => {
  const characterHitPoints = useAppSelector(state => state.basicInformation.latest.hitPoints);
  const { isOpen, open: openEditor, setOpen: handleEditorOpen } = useModal();
  const label = "Hit Points";

  return (
    <FloatingLabel label={label} floating>
      <Flex
        flex={"1"}
        height={"100%"}
        borderWidth={"1px"}
        borderColor={"border"}
        borderRadius={"md"}
      >
        <Button
          flex={"1"}
          padding={1}
          justifyContent={"start"}
          alignItems={"start"}
          height={"100%"}
          variant={"ghost"}
          onClick={openEditor}
        >
          <VStack
            flex={"1"}
            rowGap={0}
          >
            <StatusBar max={characterHitPoints.max} current={{ value: characterHitPoints.current }} temp={{ value: characterHitPoints.temp }} />
            <Box margin={-1.5}>
              <Text textStyle={"sm"}>
                {characterHitPoints.current}/{characterHitPoints.max}
                &nbsp;{characterHitPoints.temp > 0 ? "(Temp: ".concat(characterHitPoints.temp.toString()).concat(")") : undefined}
              </Text>
            </Box>
          </VStack>
        </Button>
        <FloatingDrawer
          title={label}
          size={"sm"}
          open={isOpen}
          onOpenChange={det => handleEditorOpen(det.open)}
        >
          <Flex width={"100%"} justifyContent={"center"}>
            <HitPointsEditor />
          </Flex>
        </FloatingDrawer>
      </Flex>
    </FloatingLabel>
  );
};

export default HitPointsWidget;
