import FloatingDrawer from "@/components/FloatingDrawer";
import FloatingLabel from "@/components/FloatingLabel";
import { useModal } from "@/hooks/useModal";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { JSX } from "react";
import HitDiceEditor from "./HitDiceEditor";

const HitDiceWidget = (): JSX.Element => {
  const hitDice = useAppSelector(state => state.basicInformation.latest.hitDice);
  const { isOpen, open: openEditor, setOpen: handleEditorOpen } = useModal();
  const label = "Hit Dice";

  let buttonText = "";
  let anyTextSet = false;
  hitDice.forEach((hd) => {
    if (hd.max <= 0 || hd.hitDie <= 0) {
      return;
    }

    buttonText += `${anyTextSet ? ", " : ""}(${hd.max - hd.numUsed}/${hd.max}) d${hd.hitDie}`;
    anyTextSet = true;
  });
  if (anyTextSet) {
    buttonText += " Remaining";
  }
  else {
    buttonText = "Click to set HD";
  }

  return (
    <FloatingLabel label={label} floating>
      <Flex
        flex={"1"}
        height={"100%"}
        borderWidth={"1px"}
        borderColor={"border"}
        borderRadius={"md"}
        minHeight={"2.5rem"}
      >
        <Button
          flex={"1"}
          padding={1}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
          variant={"ghost"}
          onClick={openEditor}
        >
          <Box zIndex={1}>
            <Text textStyle={"sm"}>
              {buttonText}
            </Text>
          </Box>
        </Button>
        <FloatingDrawer
          title={label}
          open={isOpen}
          onOpenChange={det => handleEditorOpen(det.open)}
        >
          <Flex width={"100%"} justifyContent={"center"}>
            <HitDiceEditor />
          </Flex>
        </FloatingDrawer>
      </Flex>
    </FloatingLabel>
  );
};

export default HitDiceWidget;
