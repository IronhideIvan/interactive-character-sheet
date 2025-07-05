import { CalculationValue, CalculationValueType, CalculationVariableDeclarationExpression } from "@/types/common/dataCalculation";
import { createListCollection, HStack } from "@chakra-ui/react";
import { JSX } from "react";
import InlineTextEditor from "../editors/InlineTextEditor";
import CalculationValueEditor from "../editors/CalculationValueEditor";
import LinkingText from "./LinkingText";
import { DataDropdownEditor, DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";

type VariableDeclarationProps = {
  expression: CalculationVariableDeclarationExpression;
  onChange: (newExpression: CalculationVariableDeclarationExpression) => void;
};

const VariableDeclaration = ({ expression, onChange }: VariableDeclarationProps): JSX.Element => {
  const handleVariableNameChange = (value: string) => {
    onChange({
      ...expression,
      variable: {
        ...expression.variable,
        name: value,
      },
    });
  };

  const handleVariableTypeChange = (values: string[]) => {
    onChange({
      ...expression,
      variable: {
        ...expression.variable,
        type: values[0] as CalculationValueType,
      },
    });
  };

  const handleVariableValueChange = (value: CalculationValue) => {
    onChange({
      ...expression,
      value: value,
    });
  };

  return (
    <HStack>
      <LinkingText text="declare" />
      <InlineTextEditor placeholder="<Name>" value={expression.variable.name} onChange={handleVariableNameChange} />
      <LinkingText text="as" />
      <DataDropdownEditor
        collection={typeReferenceOptions}
        onSelectionChange={handleVariableTypeChange}
        selectedItemIds={[expression.variable.type]}
      />
      <LinkingText text="with value" />
      <CalculationValueEditor calculationValue={expression.value} onChange={handleVariableValueChange} />
    </HStack>
  );
};

const typeReferenceOptions = createListCollection<DataDropdownItem>({
  items: [
    {
      id: CalculationValueType.Number,
      label: "Number",
    },
  ],
  itemToValue: item => item.id,
});

export default VariableDeclaration;
