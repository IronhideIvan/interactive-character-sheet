import { Collapsible } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import { SectionTitle, SectionTitleProps } from "./SectionTitle";

type CollapsibleSectionProps = {
  children?: ReactNode;
} & SectionTitleProps;

const CollapsibleSection = ({ children, ...sectionTitleProps }: CollapsibleSectionProps): JSX.Element => {
  return (
    <Collapsible.Root defaultOpen={true} width={"100%"}>
      <Collapsible.Trigger width={"100%"}>
        <SectionTitle {...sectionTitleProps} />
      </Collapsible.Trigger>
      <Collapsible.Content>
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleSection;
