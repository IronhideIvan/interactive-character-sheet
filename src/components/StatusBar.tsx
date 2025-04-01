import { Box, Progress, Text } from "@chakra-ui/react";
import { JSX } from "react";

type StatusType = {
  value: number;
  color?: string;
};

type StatusBarProps = {
  max: number;
  current: StatusType;
  temp?: StatusType;
};

const StatusBar = ({ max, current, temp }: StatusBarProps): JSX.Element => {
  const percentage = max <= 0 ? 0 : Math.floor((current.value / max) * 100);
  return (
    <Box
      data-testid="test-component"
      display={"flex"}
      flexDir={"row"}
      width={"100%"}
    >
      <Box
        position={"relative"}
        width={"100%"}
        display={"flex"}
        flexDir={"column"}
      >
        <Progress.Root
          pos={"absolute"}
          width={"100%"}
          size={"lg"}
          value={current.value}
          colorPalette={max <= 0 ? "gray" : current.color ?? "red"}
          max={max}
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        {max > 0 && (
          <Progress.Root
            width={"100%"}
            size={"lg"}
            value={temp?.value ?? 0}
            colorPalette={temp?.color ?? "blue"}
            pos={"absolute"}
            max={max}
          >
            <Progress.Track bg={"none"}>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        )}
      </Box>
      <Box ml={1} transform={"translate(0, -25%)"}>
        <Text textStyle={"sm"}>{percentage}%</Text>
      </Box>
    </Box>
  );
};

export default StatusBar;
