import { CalculationEvaluationExpression, CalculationExpression, CalculationExpressionType, CalculationValueType, CalculationVariableAssignmentExpression, CalculationVariableDeclarationExpression } from "@/types/common/dataCalculation";
import { Menu, Button, Portal } from "@chakra-ui/react";
import { JSX } from "react";
import { v4 } from "uuid";
import { buildDefaultCalculationValueOfType } from "../../dataCalculationUtil";

type NewExpressionMenuProps = {
  label: string;
  onAddNewExpression: (newExpression: CalculationExpression, unrelatedChildren: CalculationExpression[]) => void;
};

const NewExpressionMenu = ({ label, onAddNewExpression }: NewExpressionMenuProps): JSX.Element => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" width={"100%"}>
          {label}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              value={CalculationExpressionType.VariableDeclaration}
              onClick={() => {
                const newExpr: CalculationVariableDeclarationExpression = {
                  id: v4(),
                  type: CalculationExpressionType.VariableDeclaration,
                  variable: {
                    id: v4(),
                    name: "",
                    type: CalculationValueType.Number,
                  },
                  value: buildDefaultCalculationValueOfType(CalculationValueType.Number),
                };
                onAddNewExpression(newExpr, []);
              }}
            >
              Variable Declaration
            </Menu.Item>
            <Menu.Item
              value={CalculationExpressionType.VariableAssignment}
              onClick={() => {
                const newEval: CalculationEvaluationExpression = {
                  id: v4(),
                  type: CalculationExpressionType.Evaluation,
                  baseValue: buildDefaultCalculationValueOfType(CalculationValueType.Number),
                  operationIds: [],
                };

                const newExpr: CalculationVariableAssignmentExpression = {
                  id: v4(),
                  type: CalculationExpressionType.VariableAssignment,
                  variableId: "",
                  evaluationId: newEval.id,
                };

                onAddNewExpression(newExpr, [newEval]);
              }}
            >
              Variable Assignment
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default NewExpressionMenu;
