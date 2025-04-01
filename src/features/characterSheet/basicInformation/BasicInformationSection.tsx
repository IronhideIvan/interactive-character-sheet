import SectionHeaderEditable from "@/components/SectionHeaderEditable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { JSX, useState } from "react";
import { setBackground, setName, setSpecies } from "./basicInformationSlice";
import FloatingLabelTextField from "@/components/FloatingLabelTextField";
import EditClassesDrawer from "./widgets/editClasses/EditClassesDrawer";
import EditClassesField from "./widgets/editClasses/EditClassesField";
import CharacterLevelWidget from "./widgets/characterLevelWidget/CharacterLevelWidgget";
import HitPointsWidget from "./widgets/hitPointsWidget/HitPointsWidget";
import HitDiceWidget from "./widgets/hitDiceWidget/HitDiceWidget";

const BasicInformationSection = (): JSX.Element => {
  const { name: characterName, species, background: characterBackground, classes: characterClasses } = useAppSelector((state) => {
    return state.basicInformation.latest;
  });
  const dispatch = useAppDispatch();
  const [isClassesWidgetOpen, setIsClassesWidgetOpen] = useState(false);

  const handleNameChange = (newName: string) => {
    dispatch(setName(newName));
  };

  const handleSpeciesChange = (value: string) => {
    dispatch(setSpecies(value));
  };

  const handleBackgroundChange = (value: string) => {
    dispatch(setBackground(value));
  };

  const handleClassesOpen = () => {
    setIsClassesWidgetOpen(true);
  };

  const handleClassesClose = () => {
    setIsClassesWidgetOpen(false);
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
      >
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <EditClassesField
            textStyle={"lg"}
            fontWeight={"bold"}
            classes={characterClasses}
            onClick={handleClassesOpen}
          />
          {isClassesWidgetOpen && (
            <EditClassesDrawer open={isClassesWidgetOpen} onClose={handleClassesClose} />
          )}
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
          <HitPointsWidget />
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <HitDiceWidget />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BasicInformationSection;
