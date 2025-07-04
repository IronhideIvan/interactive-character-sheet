import CollapsibleSection from "@/components/CollapsibleSection";
import { useAppSelector } from "@/redux/hooks";
import { JSX } from "react";
import CustomGridsSection from "./CustomGridsSection";

const CustomGridsSections = (): JSX.Element => {
  const grids = useAppSelector(state => state.customGrids.latest);

  if (!grids.length) {
    return <></>;
  }

  return (
    <CollapsibleSection label="Grids" textStyle={"xl"}>
      {grids.map((g) => {
        return (
          <CustomGridsSection key={g.id} grid={g} />
        );
      })}
    </CollapsibleSection>
  );
};

export default CustomGridsSections;
