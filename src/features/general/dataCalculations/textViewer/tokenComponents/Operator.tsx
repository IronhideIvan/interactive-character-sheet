import { DataDropdownEditor, DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import { CalculationOperatorExpression, CalculationOperatorType, CalculationValue, CalculationVariable } from "@/types/common/dataCalculation";
import { createListCollection, HStack } from "@chakra-ui/react";
import { JSX } from "react";
import CalculationValueEditor from "../editors/CalculationValueEditor";
import { Dictionary } from "@/types/common/dictionary";

type OperatorProps = {
  expression: CalculationOperatorExpression;
  variablesInScope: Dictionary<CalculationVariable>;
  onChange: (newExpression: CalculationOperatorExpression) => void;
};

const Operator = ({ expression, variablesInScope, onChange }: OperatorProps): JSX.Element => {
  const handleOperatorChange = (newValues: string[]) => {
    const op = newValues[0] as CalculationOperatorType;
    if (op) {
      onChange({
        ...expression,
        operator: op,
      });
    }
  };

  const handleValueChange = (value: CalculationValue) => {
    onChange({
      ...expression,
      value: value,
    });
  };

  return (
    <HStack>
      <DataDropdownEditor
        collection={typeReferenceOptions}
        onSelectionChange={handleOperatorChange}
        selectedItemIds={[expression.operator]}
        minWidth={"5rem"}
      />
      <CalculationValueEditor
        calculationValue={expression.value}
        variablesIsScope={variablesInScope}
        onChange={handleValueChange}
      />
    </HStack>
  );
};

const typeReferenceOptions = createListCollection<DataDropdownItem>({
  items: [
    {
      id: CalculationOperatorType.Add,
      label: "+",
    },
  ],
  itemToValue: item => item.id,
});

export default Operator;
