import { Box, Field, Grid, GridItem, Input, Stack, Text } from "@chakra-ui/react";
import { JSX, useState } from "react";
import * as allGameIcons from "react-icons/gi";
import * as allFontAwesomeIcons from "react-icons/fa";
import IconCard from "./IconCard";

const allGiKeys = Object.keys(allGameIcons);
const allFaKey = Object.keys(allFontAwesomeIcons);

const IconPicker = (): JSX.Element => {
  const searchLimit = 100;
  const [searchResults, setSearchResults] = useState<string[]>([...allGiKeys.slice(0, searchLimit)]);
  const [searchTerm, setSearchTerm] = useState("");

  const allIconCount = allGiKeys.length + allFaKey.length;

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);

    if (term.length === 0) {
      setSearchResults([...allGiKeys.slice(0, searchLimit)]);
    }

    const lowercaseTerm = term.toLowerCase();

    const results: string[] = [];
    for (let i = 0; i < allGiKeys.length; i++) {
      if (results.length >= searchLimit) {
        break;
      }

      const key = allGiKeys[i];
      if (key.toLowerCase().includes(lowercaseTerm)) {
        results.push(key);
      }
    }

    for (let i = 0; i < allFaKey.length; i++) {
      if (results.length >= searchLimit) {
        break;
      }

      const key = allFaKey[i];
      if (key.toLowerCase().includes(lowercaseTerm)) {
        results.push(key);
      }
    }

    setSearchResults(results);
  };

  return (
    <Box width="100%">
      <Stack justifyContent={"center"}>
        <Box display={"flex"} justifyContent={"center"}>
          <Field.Root maxWidth={"20rem"}>
            <Field.Label>Search</Field.Label>
            <Input
              value={searchTerm}
              onChange={(e) => {
                handleSearchTermChange(e.target.value);
              }}
              placeholder="Campfire"
            />
          </Field.Root>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Text>Showing {searchResults.length} of {allIconCount} (Max: 100)</Text>
        </Box>
      </Stack>
      <Grid
        flexDirection={"row"}
        width={"100%"}
        templateColumns="repeat(12, 1fr)"
        rowGap={2}
      >
        {searchResults.map((iconId) => {
          return (
            <GridItem justifyContent={"center"} key={iconId} colSpan={{ smDown: 4, sm: 3, md: 2 }}>
              <IconCard iconId={iconId} onClick={id => console.log(id)} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default IconPicker;
