import { Box, Collapsible, IconButton } from "@chakra-ui/react";
import { JSX, ReactNode, useState } from "react";
import { SectionTitle, SectionTitleProps } from "./SectionTitle";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type CollapsibleSectionProps = {
  children?: ReactNode;
} & SectionTitleProps;

const CollapsibleSection = ({ children, ...sectionTitleProps }: CollapsibleSectionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible.Root
      open={isOpen}
      width={"100%"}
    >
      <SectionTitle
        leftActions={isOpen
          ? (
            <IconButton flexShrink={"0"} variant={"ghost"} onClick={() => setIsOpen(false)}>
              <FaChevronUp />
            </IconButton>
          )
          : (
            <IconButton flexShrink={"0"} variant={"ghost"} onClick={() => setIsOpen(true)}>
              <FaChevronDown />
            </IconButton>
          )}
        {...sectionTitleProps}
      />
      <Collapsible.Content>
        <Box
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          {children}

        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleSection;
