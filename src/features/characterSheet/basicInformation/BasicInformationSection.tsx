import SectionHeaderEditable from "@/components/sectionHeaderEditable/SectionHeaderEditable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { setBackground, setName, setSpecies } from "./basicInformationSlice";
import ImportantTextField from "@/components/fields/importantTextField";

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
      >
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Class & Level</Text>
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
            label="Baclground"
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BasicInformationSection;
