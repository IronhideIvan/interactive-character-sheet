import FloatingLabel from "@/components/FloatingLabel";
import { InfoTip } from "@/components/ToggleTip";
import WidgetPaper from "@/components/WidgetPaper";
import { useCharacterLevel } from "@/hooks/useCharacterLevel";
import { Box, Text } from "@chakra-ui/react";
import { JSX } from "react";

const CharacterLevelWidget = (): JSX.Element => {
  const characterLevel = useCharacterLevel();

  return (
    <FloatingLabel label="Character Level" floating>
      <WidgetPaper>
        <Text userSelect={"none"}>
          {characterLevel}
        </Text>
        <Box position={"absolute"} right={"4px"} top={0}>
          <InfoTip showArrow positioning={{ placement: "top" }}>
            <Text textStyle={"md"}>This is a calculated field</Text>
          </InfoTip>
        </Box>
      </WidgetPaper>
    </FloatingLabel>
  );
};

export default CharacterLevelWidget;
