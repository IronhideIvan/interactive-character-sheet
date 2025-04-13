import SectionHeaderEditable from "@/components/SectionHeaderEditable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { JSX } from "react";
import { setBackground, setName, setSpecies } from "./basicInformationSlice";
import FloatingLabelTextField from "@/components/FloatingLabelTextField";
import CharacterLevelWidget from "./widgets/characterLevelWidget/CharacterLevelWidget";
import HitPointsWidget from "./widgets/hitPointsWidget/HitPointsWidget";
import HitDiceWidget from "./widgets/hitDiceWidget/HitDiceWidget";
import ArmorClassWidget from "./widgets/armorClassWidget.tsx/ArmorClassWidget";
import DeathSavesWidget from "./widgets/deathSavesWidget/DeathSavesWidget";
import EditClassesWidget from "./widgets/editClasses/EditClassesWidget";
import ProficienyBonusWidget from "./widgets/profBonusWidget.tsx/ProficienyBonusWidget";

const BasicInformationSection = (): JSX.Element => {
  const { name: characterName, species, background: characterBackground } = useAppSelector((state) => {
    return state.basicInformation.latest;
  });
  const dispatch = useAppDispatch();

  const handleNameChange = (newName: string) => {
    dispatch(setName(newName));
  };

  const handleSpeciesChange = (value: string) => {
    dispatch(setSpecies(value));
  };

  const handleBackgroundChange = (value: string) => {
    dispatch(setBackground(value));
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      width="100%"
      padding={2}
    >
      <SectionHeaderEditable placeholder="Character Name" value={characterName} onValueChange={handleNameChange} />
      <SimpleGrid
        gap={2}
        justifyContent="center"
        templateColumns="repeat(12, 1fr)"
        rowGap={4}
      >
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <EditClassesWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <FloatingLabelTextField
            textAlign={"center"}
            paddingY={6}
            textStyle={"lg"}
            fontWeight={"bold"}
            value={species}
            onValueChange={handleSpeciesChange}
            label="Species"
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <FloatingLabelTextField
            textAlign={"center"}
            paddingY={6}
            textStyle={"lg"}
            fontWeight={"bold"}
            value={characterBackground}
            onValueChange={handleBackgroundChange}
            label="Background"
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <CharacterLevelWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <ProficienyBonusWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <HitPointsWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <HitDiceWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <ArmorClassWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <DeathSavesWidget />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BasicInformationSection;
