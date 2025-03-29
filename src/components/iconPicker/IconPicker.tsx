import { Box, Color, Field, Grid, GridItem, GridItemProps, Input, parseColor, Stack, Text } from "@chakra-ui/react";
import { JSX, useState } from "react";
import * as allGameIcons from "react-icons/gi";
import * as allFontAwesomeIcons from "react-icons/fa";
import IconCard from "./IconCard";
import AppColorPicker from "../colorPicker/ColorPicker";
import { Icon } from "@/types/data/icon";

const allGiKeys = Object.keys(allGameIcons);
const allFaKey = Object.keys(allFontAwesomeIcons);

export type IconPickerProps = {
  defaultIcon?: Icon;
  onSelect: (icon: Icon) => void;
} & Pick<GridItemProps, "colSpan" | "height">;

export const IconPicker = ({ defaultIcon, onSelect, ...props }: IconPickerProps): JSX.Element => {
  const searchLimit = 50;
  const [searchResults, setSearchResults] = useState<string[]>([...allGiKeys.slice(0, searchLimit)]);
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState<Color>(defaultIcon ? parseColor(defaultIcon.color) : parseColor("#eb5e41"));

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

  const handleColorChange = (color: Color) => {
    setIconColor(color);
  };

  const handleIconSelect = (iconId: string) => {
    onSelect({
      id: iconId,
      color: iconColor.toString("hex"),
    });
  };

  return (
    <Box
      width="100%"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      height={props.height}
      overflow={"hidden"}
      p={2}
    >
      <Stack justifyContent={"center"}>
        <Box display={"flex"} justifyContent={"center"}>
          <AppColorPicker color={iconColor} onColorChange={handleColorChange} />
        </Box>
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
          <Text>Showing {searchResults.length} of {allIconCount} (Max: {searchLimit})</Text>
        </Box>
      </Stack>
      <Grid
        flexDirection={"row"}
        width={"100%"}
        templateColumns="repeat(12, 1fr)"
        rowGap={2}
        overflowY={"auto"}
      >
        {searchResults.map((iconId) => {
          return (
            <GridItem justifyContent={"center"} key={iconId} colSpan={props.colSpan ? props.colSpan : { smDown: 4, sm: 3, md: 2 }}>
              <IconCard iconId={iconId} iconColor={iconColor.toString("hex")} onClick={id => handleIconSelect(id)} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};
