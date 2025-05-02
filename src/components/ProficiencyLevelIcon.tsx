import { ProficiencyLevel } from "@/types/character/score";
import { HStack, StackProps } from "@chakra-ui/react";
import { JSX } from "react";
import { GiCheckMark } from "react-icons/gi";

type ProficiencyLevelIconProps = {
  proficiencyLevel: ProficiencyLevel;
} & StackProps;

const ProficiencyLevelIcon = ({ proficiencyLevel, ...props }: ProficiencyLevelIconProps): JSX.Element => {
  const iconStyles = { height: "100%", width: "100%" };
  return (
    <HStack
      {...props}
      width={props.width ?? "1rem"}
      justifyContent={props.justifyContent ?? "end"}
      gap={props.gap ?? 0}
    >
      {proficiencyLevel === ProficiencyLevel.Expertise
        ? (
          <>
            <GiCheckMark key={"check-1"} style={iconStyles} />
            <GiCheckMark key={"check-2"} style={iconStyles} />
          </>
        )
        : proficiencyLevel === ProficiencyLevel.Proficiency
          ? (
            <GiCheckMark style={iconStyles} />
          )
          : <></>}
    </HStack>
  );
};

export default ProficiencyLevelIcon;
