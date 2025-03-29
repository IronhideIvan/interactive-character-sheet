import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { JSX } from "react";
import DynamicIcon from "../icons/DynamicIcon";

type IconCardProps = {
  iconId: string;
  onClick: (id: string) => void;
};

const IconCard = ({ iconId, onClick }: IconCardProps): JSX.Element => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Button
        onClick={() => onClick(iconId)}
        variant={"outline"}
        pt={4}
        pb={4}
        minH={"5rem"}
        width={{ base: "7rem", md: "7.6rem", lg: "8rem" }}
      >
        <Stack justifyContent={"center"} width={"100%"}>
          <Box display={"flex"} justifyContent={"center"}>
            <DynamicIcon iconId={iconId} />
          </Box>
          <Text overflow={"hidden"} textStyle={"sm"} truncate>{iconId}</Text>
        </Stack>
      </Button>
    </Box>
  );
};

export default IconCard;
