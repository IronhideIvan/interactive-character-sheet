import { CalculationEvaluationExpression, CalculationExpressionType, CalculationVariable, CalculationVariableAssignmentExpression, DataCalculation } from "@/types/common/dataCalculation";
import { Dictionary } from "@/types/common/dictionary";
import { HStack, Text } from "@chakra-ui/react";
import { JSX } from "react";
import LinkingText from "./LinkingText";
import VariablePicker from "../editors/VariablePicker";
import Evaluation from "./Evaluation";
import { CalculationAggregate } from "../../dataCalculationUtil";

type VariableAssignmentProps = {
  expression: CalculationVariableAssignmentExpression;
  calculation: DataCalculation;
  variablesInScope: Dictionary<CalculationVariable>;
  onCalculationChanged: (newCalculation: DataCalculation) => void;
};

const VariableAssignment = ({
  calculation, expression, variablesInScope, onCalculationChanged,
}: VariableAssignmentProps): JSX.Element => {
  const handleVariableChange = (value: CalculationVariable) => {
    const agg = new CalculationAggregate(calculation);
    const newExp: CalculationVariableAssignmentExpression = {
      ...expression,
      variableId: value.id,
    };
    agg.upsertExpression(newExp);
  };

  const evaluationExpression = calculation.expressions[expression.evaluationId];

  return (
    <HStack>
      <LinkingText text="Set" />
      <VariablePicker
        selectedVariableId={expression.variableId}
        variablesInScope={variablesInScope}
        onSelectionChange={handleVariableChange}
      />
      <LinkingText text="To" />
      {(evaluationExpression && evaluationExpression.type === CalculationExpressionType.Evaluation)
        ? (
          <Evaluation
            expression={evaluationExpression as CalculationEvaluationExpression}
            calculation={calculation}
            onCalculationChanged={onCalculationChanged}
            variablesInScope={variablesInScope}
          />
        )
        : (
          <Text>UNKNOWN EVAL</Text>
        )}
    </HStack>
  );
};

export default VariableAssignment;
