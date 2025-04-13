import FloatingLabel from "@/components/FloatingLabel";
import { InfoTip } from "@/components/ToggleTip";
import { useProficiencyBonus } from "@/hooks/useProficiency";
import { getBonusWithOperator } from "@/utils/bonusUtils";
import { Box, Flex, Text } from "@chakra-ui/react";
import { JSX } from "react";

const ProficienyBonusWidget = (): JSX.Element => {
  const proficiencyBonus = useProficiencyBonus();

  return (
    <FloatingLabel label="Proficiency Bonus" floating>
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
          {getBonusWithOperator(proficiencyBonus)}
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

export default ProficienyBonusWidget;
