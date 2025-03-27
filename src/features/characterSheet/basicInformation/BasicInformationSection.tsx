import { useAppSelector } from "../../../redux/hooks";
import { Box, Editable, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { JSX } from "react";

const BasicInformationSection = (): JSX.Element => {
  const { name } = useAppSelector((state) => {
    return state.basicInformation;
  });

  return (
    <Box display="flex" flexDir="column" width="100%">
      <Editable.Root placeholder="Character Name">
        <Editable.Preview width="100%" justifyContent="center" />
        <Editable.Input textAlign="center" />
      </Editable.Root>
      <SimpleGrid
        gap={2}
        justifyContent="center"
        bg="yellow"
        columns={12}
      >
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Race</Text>
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Class & Level</Text>
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
          <Text>Background</Text>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BasicInformationSection;
