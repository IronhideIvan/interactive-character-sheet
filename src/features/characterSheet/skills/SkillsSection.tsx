import { useAppSelector } from "@/redux/hooks";
import { ConditionalValue, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import SkillScoreWidget from "./widget/SkillScoreWidget";
import { SectionTitle } from "@/components/SectionTitle";

type SkillsSectionProps = {
  columnSpan: ConditionalValue<number | "auto">;
};

const SkillsSection = ({ columnSpan }: SkillsSectionProps): JSX.Element => {
  const skillScores = useAppSelector(state => state.skillScores.latest);
  const skills = useAppSelector(state => state.skillsDataSet.latest);

  return (
    <VStack width={"100%"}>
      <SectionTitle label="Skills" />
      <SimpleGrid
        gap={2}
        justifyContent={"center"}
        templateColumns={"repeat(12, 1fr)"}
        rowGap={4}
        width={"100%"}
      >
        {skillScores.map((ss) => {
          const skill = skills.find(s => s.id === ss.skillId);
          if (!skill) {
            return <></>;
          }
          return (
            <GridItem key={ss.skillId} colSpan={columnSpan}>
              <SkillScoreWidget skillScore={ss} skill={skill} />
            </GridItem>
          );
        })}

      </SimpleGrid>
    </VStack>
  );
};

export default SkillsSection;
