import { CalculationValue, CalculationVariable, CalculationVariableAssignmentExpression } from "@/types/common/dataCalculation";
import { Dictionary } from "@/types/common/dictionary";
import { HStack } from "@chakra-ui/react";
import { JSX } from "react";
import LinkingText from "./LinkingText";
import CalculationValueEditor from "../editors/CalculationValueEditor";
import VariablePicker from "../editors/VariablePicker";

type VariableAssignmentProps = {
  expression: CalculationVariableAssignmentExpression;
  allVariables: Dictionary<CalculationVariable>;
  onChange: (newExpression: CalculationVariableAssignmentExpression) => void;
};

const VariableAssignment = ({ expression, allVariables, onChange }: VariableAssignmentProps): JSX.Element => {
  const handleValueChange = (value: CalculationValue) => {
    onChange({
      ...expression,
      value: value,
    });
  };

  const handleVariableChange = (value: CalculationVariable) => {
    onChange({
      ...expression,
      variableId: value.id,
    });
  };

  return (
    <HStack>
      <LinkingText text="Set" />
      <VariablePicker
        selectedVariableId={expression.variableId}
        allVariables={allVariables}
        onSelectionChange={handleVariableChange}
      />
      <LinkingText text="To" />
      <CalculationValueEditor calculationValue={expression.value} onChange={handleValueChange} />
    </HStack>
  );
};

export default VariableAssignment;
