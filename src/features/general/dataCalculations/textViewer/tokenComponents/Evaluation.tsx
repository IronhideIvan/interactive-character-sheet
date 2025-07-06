import { CalculationEvaluationExpression, CalculationExpression, CalculationExpressionType, CalculationOperatorExpression, CalculationOperatorType, CalculationValue, CalculationValueType, CalculationVariable, DataCalculation } from "@/types/common/dataCalculation";
import { Dictionary } from "@/types/common/dictionary";
import { JSX, ReactNode } from "react";
import { buildDefaultCalculationValueOfType, CalculationAggregate, getCalculationValueDisplayText } from "../../dataCalculationUtil";
import { ID } from "@/types/common/entityBase";
import { useModal } from "@/hooks/useModal";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import CalculationValueEditor from "../editors/CalculationValueEditor";
import { v4 } from "uuid";
import Operator from "./Operator";
import ConfirmIconButton from "@/components/ConfirmIconButton";
import { FaTrash } from "react-icons/fa";

type EvaluationProps = {
  expression: CalculationEvaluationExpression;
  calculation: DataCalculation;
  variablesInScope: Dictionary<CalculationVariable>;
  onCalculationChanged: (newCalculation: DataCalculation) => void;
};

const Evaluation = ({
  expression,
  calculation,
  onCalculationChanged,
  variablesInScope,
}: EvaluationProps): JSX.Element => {
  const { isOpen, open, close } = useModal();

  const handleAddDirectDescendant = () => {
    const newExpression: CalculationOperatorExpression = {
      id: v4(),
      type: CalculationExpressionType.Operator,
      operator: CalculationOperatorType.Add,
      value: buildDefaultCalculationValueOfType(CalculationValueType.Number),
    };

    const agg = new CalculationAggregate(calculation);
    agg.addChildExpression(expression, newExpression);
    onCalculationChanged(agg.getTransformation());
  };
  const handleDeleteDirectDescendant = (id: ID) => {
    const agg = new CalculationAggregate(calculation);
    agg.deleteChildExpression(expression, id);
    onCalculationChanged(agg.getTransformation());
  };

  const handleChildExpressionChange = (updatedExpression: CalculationExpression) => {
    const agg = new CalculationAggregate(calculation);
    agg.upsertExpression(updatedExpression);
    onCalculationChanged(agg.getTransformation());
  };

  let displayValue = getCalculationValueDisplayText(expression.baseValue, calculation);
  if (expression.operationIds.length > 0) {
    displayValue += "...";
  }

  const handleBaseValueChange = (value: CalculationValue) => {
    const agg = new CalculationAggregate(calculation);
    const newEval: CalculationEvaluationExpression = {
      ...expression,
      baseValue: value,
    };
    agg.upsertExpression(newEval);
    onCalculationChanged(agg.getTransformation());
  };

  const operatorNodes: {
    id: ID; node: ReactNode;
  }[] = [];

  expression.operationIds.map((id) => {
    const op = calculation.expressions[id] as CalculationOperatorExpression;
    if (!op || op.type !== CalculationExpressionType.Operator) {
      return;
    }

    operatorNodes.push({
      id: id,
      node: <Operator expression={op} variablesInScope={variablesInScope} onChange={handleChildExpressionChange} />,
    });
  });

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
          <Box display={"flex"} width={"100%"} justifyContent={"center"}>
            <VStack alignItems={"end"} justifyContent={"end"}>
              <CalculationValueEditor
                onChange={handleBaseValueChange}
                calculationValue={expression.baseValue}
                variablesIsScope={variablesInScope}
              />
              {operatorNodes.map((n) => {
                return (
                  <HStack key={n.id}>
                    <ConfirmIconButton
                      size={"sm"}
                      variant={"ghost"}
                      rounded={"full"}
                      onConfirmClick={() => {
                        handleDeleteDirectDescendant(n.id);
                      }}
                      confirm={{
                        variant: "outline",
                        color: "red",
                      }}
                    >
                      <FaTrash />
                    </ConfirmIconButton>
                    {n.node}
                  </HStack>
                );
              })}
              <Button variant={"outline"} onClick={handleAddDirectDescendant}>Add</Button>
            </VStack>
          </Box>
        </SimpleDialog>
      )}
    </Box>
  );
};

export default Evaluation;
