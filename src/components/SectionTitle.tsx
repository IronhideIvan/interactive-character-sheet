import { HStack, IconButton, Separator, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { FaRegEdit } from "react-icons/fa";

type SectionTitleProps = {
  label: string;
  showEditButton?: boolean;
  onEditButtonClick?: () => void;
};

const SectionTitle = ({ label, showEditButton, onEditButtonClick }: SectionTitleProps): JSX.Element => {
  return (
    <HStack width={"100%"}>
      <Separator flex={"1"} />
      <Text flexShrink={"0"}>{label}</Text>
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

export default SectionTitle;
