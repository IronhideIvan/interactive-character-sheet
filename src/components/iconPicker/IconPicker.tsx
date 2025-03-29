import { Box, Stack, Text } from "@chakra-ui/react";
import { JSX } from "react";
import * as allGameIcons from "react-icons/gi";
import * as allMaterialIcons from "react-icons/md";
import DynamicIcon from "../icons/DynamicIcon";

const IconPicker = (): JSX.Element => {
  return (
    <Stack flexDirection={"row"}>
      <Box>
        {Object.keys(allGameIcons).map((iconId) => {
          return (
            <Stack key={iconId} flexDirection={"row"}>
              <DynamicIcon iconId={iconId} />
              <Text>{iconId}</Text>
            </Stack>
          );
        })}
      </Box>
      <Box>
        {Object.keys(allMaterialIcons).map((iconId) => {
          return (
            <Stack key={iconId} flexDirection={"row"}>
              <DynamicIcon iconId={iconId} />
              <Text>{iconId}</Text>
            </Stack>
          );
        })}
      </Box>
    </Stack>
  );
};

export default IconPicker;
