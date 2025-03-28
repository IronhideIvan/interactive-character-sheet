import SectionHeaderEditable from "@/components/sectionHeaderEditable/sectionHeaderEditable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { setName } from "./basicInformationSlice";

const BasicInformationSection = (): JSX.Element => {
  const { name } = useAppSelector((state) => {
    return state.basicInformation;
  });
  const dispatch = useAppDispatch();

  const handleNameChange = (newName: string) => {
    dispatch(setName(newName));
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      width="100%"
      padding={2}
    >
      <SectionHeaderEditable placeholder="Character Name" value={name} onValueChange={handleNameChange} />
      <SimpleGrid
        gap={2}
        justifyContent="center"
        columns={12}
      >
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Class & Level</Text>
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Race</Text>
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Background</Text>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BasicInformationSection;
