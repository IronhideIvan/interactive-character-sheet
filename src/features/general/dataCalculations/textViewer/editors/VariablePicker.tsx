import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { useModal } from "@/hooks/useModal";
import { CalculationVariable } from "@/types/common/dataCalculation";
import { Dictionary } from "@/types/common/dictionary";
import { ID } from "@/types/common/entityBase";
import { Box, Button, VStack } from "@chakra-ui/react";
import { JSX, useState } from "react";

type VariablePickerProps = {
  selectedVariableId?: ID;
  variablesInScope: Dictionary<CalculationVariable>;
  onSelectionChange: (newVariable: CalculationVariable) => void;
};

const VariablePicker = ({
  selectedVariableId,
  variablesInScope,
  onSelectionChange,
}: VariablePickerProps): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const [variableChoices, setVariableChoices] = useState<CalculationVariable[]>([]);
  const selectedVar = selectedVariableId ? variablesInScope[selectedVariableId] : undefined;

  const handleOpenDialog = () => {
    const allPossibleKeys = Object.keys(variablesInScope);
    const choices: CalculationVariable[] = [];
    allPossibleKeys.forEach((k) => {
      if (k === selectedVariableId) {
        return;
      }

      choices.push(variablesInScope[k]);
    });
    setVariableChoices(choices);
    open();
  };

  const handleChoiceSelected = (newVar: CalculationVariable) => {
    onSelectionChange(newVar);
    close();
    setVariableChoices([]);
  };

  return (
    <Box>
      <Button variant={"outline"} onClick={handleOpenDialog}>{selectedVar ? selectedVar.name : "N/A"}</Button>
      {isOpen && variableChoices && (
        <SimpleDialog
          open={isOpen}
          title="Available Variables"
          actionButtonsType={ActionButtonType.Close}
          onClose={close}
        >
          <VStack width={"100%"}>
            {variableChoices.map((c) => {
              return <Button variant={"outline"} key={c.id} onClick={() => handleChoiceSelected(c)}>{c.name}</Button>;
            })}
          </VStack>
        </SimpleDialog>
      )}
    </Box>
  );
};

export default VariablePicker;
