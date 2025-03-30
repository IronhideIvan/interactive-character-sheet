import SectionHeaderEditable from "@/components/sectionHeaderEditable/SectionHeaderEditable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { JSX, useState } from "react";
import { setBackground, setName, setSpecies } from "./basicInformationSlice";
import ImportantTextField from "@/components/fields/importantTextField";
import EditClassesWidget from "./widgets/editClasses/EditClassesWidget";
import EditClassesField from "./widgets/editClasses/EditClassesField";

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
            <EditClassesWidget open={isClassesWidgetOpen} onClose={handleClassesClose} />
          )}
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <ImportantTextField
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
          <ImportantTextField
            textAlign={"center"}
            paddingY={6}
            textStyle={"lg"}
            fontWeight={"bold"}
            value={characterBackground}
            onValueChange={handleBackgroundChange}
            label="Background"
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BasicInformationSection;
