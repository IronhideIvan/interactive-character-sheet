import { CalculationValue, CalculationValueType, CalculationVariable } from "@/types/common/dataCalculation";
import { JSX, ReactNode } from "react";
import InlineNumberEditor from "./InlineNumberEditor";
import { Box, Button, createListCollection, Text, VStack } from "@chakra-ui/react";
import { Dictionary } from "@/types/common/dictionary";
import VariablePicker from "./VariablePicker";
import { useModal } from "@/hooks/useModal";
import { buildDefaultCalculationValueOfType } from "../../dataCalculationUtil";
import { DataDropdownEditor, DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { ActionButtonType } from "@/components/dialog/actionButtonTypes";

type CalculationValueEditorProps = {
  calculationValue: CalculationValue;
  variablesIsScope: Dictionary<CalculationVariable>;
  onChange: (newValue: CalculationValue) => void;
};

const CalculationValueEditor = (
  { calculationValue, variablesIsScope, onChange }: CalculationValueEditorProps,
): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const handleTypeChange = (newTypes: string[]) => {
    const newType = newTypes[0] as CalculationValueType;
    if (newType && calculationValue.type !== newType) {
      onChange(buildDefaultCalculationValueOfType(newType));
    }
  };

  let displayValue: string = "Edit";
  let valueNode: ReactNode;
  switch (calculationValue.type) {
    case CalculationValueType.Number:
      {
        const handleNumberChange = (value: number) => {
          onChange({
            type: calculationValue.type,
            number: value,
          });
        };

        displayValue = (calculationValue.number ?? 0).toString();
        valueNode = <InlineNumberEditor value={calculationValue.number ?? 0} onValueChanged={handleNumberChange} />;
      }
      break;
    case CalculationValueType.Variable:
      {
        const handleIdChange = (value: CalculationVariable) => {
          onChange({
            type: calculationValue.type,
            refId: value.id,
          });
        };

        const refNode = variablesIsScope[calculationValue.refId ?? ""];
        if (refNode) {
          displayValue = refNode.name;
        }
        else {
          displayValue = "N/A";
        }

        valueNode = <VariablePicker variablesInScope={variablesIsScope} selectedVariableId={calculationValue.refId ?? ""} onSelectionChange={handleIdChange} />;
      }
      break;
    default:
      valueNode = <Text>UNKNOWN VALUE TYPE: {calculationValue.type}</Text>;
      break;
  }

  return (
    <Box>
      <Button variant={"outline"} onClick={open}>{displayValue}</Button>
      {isOpen && (
        <SimpleDialog
          title="Set Value"
          open={isOpen}
          actionButtonsType={ActionButtonType.Close}
          onClose={close}
        >
          <VStack width={"100%"} justifyContent={"center"}>
            <VStack justifyContent={"start"}>
              <Text>Type</Text>
              <DataDropdownEditor
                collection={typeReferenceOptions}
                onSelectionChange={handleTypeChange}
                selectedItemIds={[calculationValue.type]}
              />
            </VStack>
            <VStack justifyContent={"start"}>
              <Text>Value</Text>
              {valueNode}
            </VStack>
          </VStack>
        </SimpleDialog>
      )}
    </Box>
  );
};

const typeReferenceOptions = createListCollection<DataDropdownItem>({
  items: [
    {
      id: CalculationValueType.Number,
      label: "Number",
    },
    {
      id: CalculationValueType.Variable,
      label: "Variable",
    },
  ],
  itemToValue: item => item.id,
});

export default CalculationValueEditor;
