import { HStack, IconButton, Separator, Text, TextProps } from "@chakra-ui/react";
import { JSX } from "react";
import { FaRegEdit } from "react-icons/fa";

export type SectionTitleProps = {
  label: string;
  showEditButton?: boolean;
  onEditButtonClick?: () => void;
} & Pick<TextProps, "textStyle">;

export const SectionTitle = ({
  label, showEditButton, onEditButtonClick, ...props
}: SectionTitleProps): JSX.Element => {
  return (
    <HStack width={"100%"}>
      <Separator flex={"1"} />
      <Text {...props} flexShrink={"0"}>{label}</Text>
      {showEditButton && (
        <IconButton flexShrink={"0"} variant={"ghost"}>
          <FaRegEdit onClick={() => {
            onEditButtonClick?.();
          }}
          />
        </IconButton>
      )}
      <Separator flex={"1"} />
    </HStack>
  );
};
