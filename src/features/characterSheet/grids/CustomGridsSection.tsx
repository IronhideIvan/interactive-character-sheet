import CollapsibleSection from "@/components/CollapsibleSection";
import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import CustomGridField from "@/features/general/grids/CustomGridField";
import CustomGridHeaderManager from "@/features/general/grids/CustomGridHeaderManager";
import { useModal } from "@/hooks/useModal";
import { CustomGrid } from "@/types/common/customGrid";
import { JSX } from "react";

type CustomGridsSectionProps = {
  grid: CustomGrid;
};

const CustomGridsSection = ({ grid }: CustomGridsSectionProps): JSX.Element => {
  const { isOpen, open, close } = useModal();

  return (
    <CollapsibleSection
      label={grid.name}
      showEditButton
      onEditButtonClick={open}
      textStyle={"lg"}
    >
      <CustomGridField grid={grid} />
      {isOpen && (
        <SimpleDialog
          title={grid.name}
          open={isOpen}
          onClose={close}
          actionButtonsType={ActionButtonType.Close}
        >
          <CustomGridHeaderManager grid={grid} />
        </SimpleDialog>
      )}
    </CollapsibleSection>
  );
};

export default CustomGridsSection;
