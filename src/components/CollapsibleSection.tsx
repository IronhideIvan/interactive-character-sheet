import { Collapsible } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import SectionTitle from "./SectionTitle";

type CollapsibleSectionProps = {
  label: string;
  children?: ReactNode;
};

const CollapsibleSection = ({ label, children }: CollapsibleSectionProps): JSX.Element => {
  return (
    <Collapsible.Root defaultOpen={true} width={"100%"}>
      <Collapsible.Trigger width={"100%"}>
        <SectionTitle label={label} />
      </Collapsible.Trigger>
      <Collapsible.Content>
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleSection;
