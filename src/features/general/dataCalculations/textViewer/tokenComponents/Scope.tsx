import { CalculationExpression, CalculationExpressionType, CalculationScopeExpression, CalculationVariable, CalculationVariableAssignmentExpression, CalculationVariableDeclarationExpression, DataCalculation } from "@/types/common/dataCalculation";
import { HStack, VStack } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import { scopeIndentMargin } from "./textStyles";
import { ID } from "@/types/common/entityBase";
import VariableDeclaration from "./VariableDeclaration";
import LinkingText from "./LinkingText";
import ConfirmIconButton from "@/components/ConfirmIconButton";
import { FaTrash } from "react-icons/fa";
import NewExpressionMenu from "../editors/NewExpressionMenu";
import { CalculationAggregate } from "../../dataCalculationUtil";
import VariableAssignment from "./VariableAssignment";
import { Dictionary } from "@/types/common/dictionary";

type ScopeProps = {
  expression: CalculationScopeExpression;
  calculation: DataCalculation;
  variablesInScope: Dictionary<CalculationVariable>;
  onCalculationChanged: (newCalculation: DataCalculation) => void;
};

const Scope = ({
  expression, calculation, onCalculationChanged, variablesInScope,
}: ScopeProps): JSX.Element => {
  const handleAddDirectDescendant = (newExpression: CalculationExpression) => {
    const agg = new CalculationAggregate(calculation);
    const newScope: CalculationScopeExpression = {
      ...expression,
      evaluationScope: [
        ...expression.evaluationScope,
        newExpression.id,
      ],
    };

    agg.upsertExpression(newExpression);
    agg.upsertExpression(newScope);
    onCalculationChanged(agg.getTransformation());
  };
  const handleDeleteDirectDescendant = (id: ID) => {
    const agg = new CalculationAggregate(calculation);
    const newScope: CalculationScopeExpression = {
      ...expression,
      evaluationScope: expression.evaluationScope.filter(existingId => existingId !== id),
    };

    agg.deleteExpression(id);
    agg.upsertExpression(newScope);
    onCalculationChanged(agg.getTransformation());
  };

  const handleChildExpressionChange = (updatedExpression: CalculationExpression) => {
    const agg = new CalculationAggregate(calculation);
    agg.upsertExpression(updatedExpression);
    onCalculationChanged(agg.getTransformation());
  };

  type ScopeDetails = {
    id: ID;
    node: ReactNode;
    variablesInScope: Dictionary<CalculationVariable>;
  };

  const scopedExpressions: ScopeDetails[] = [];
  let currentVariablesInScope: Dictionary<CalculationVariable> = { ...variablesInScope };
  expression.evaluationScope.forEach((id) => {
    const expr = calculation.expressions[id];
    if (expr) {
      const scopedExp: ScopeDetails = { id: expr.id, node: <></>, variablesInScope: currentVariablesInScope };

      switch (expr.type) {
        case CalculationExpressionType.VariableDeclaration:
        {
          const castExp = expr as CalculationVariableDeclarationExpression;
          scopedExp.node = <VariableDeclaration expression={castExp} onChange={handleChildExpressionChange} />;
          currentVariablesInScope = { ...currentVariablesInScope };
          currentVariablesInScope[castExp.variable.id] = castExp.variable;
          break;
        }
        case CalculationExpressionType.VariableAssignment:
        {
          const castExp = expr as CalculationVariableAssignmentExpression;
          scopedExp.node = (
            <VariableAssignment
              expression={castExp}
              onChange={handleChildExpressionChange}
              allVariables={currentVariablesInScope}
            />
          );
          break;
        }
        case CalculationExpressionType.Scope: {
          const castExp = expr as CalculationScopeExpression;
          scopedExp.node = (
            <Scope
              expression={castExp}
              calculation={calculation}
              onCalculationChanged={onCalculationChanged}
              variablesInScope={currentVariablesInScope}
            />
          );
          break;
        }
        default: {
          scopedExp.node = <LinkingText text={`UNKNOWN EXPRESSION TYPE ${expr.type}`} />;
          break;
        }
      }

      scopedExpressions.push(scopedExp);
    }
  });

  return (
    <VStack width={"100%"} paddingLeft={scopeIndentMargin}>
      {scopedExpressions.map((e) => {
        return (
          <HStack spaceX={2} key={e.id}>
            <ConfirmIconButton
              size={"sm"}
              variant={"ghost"}
              rounded={"full"}
              onConfirmClick={() => {
                handleDeleteDirectDescendant(e.id);
              }}
              confirm={{
                variant: "outline",
                color: "red",
              }}
            >
              <FaTrash />
            </ConfirmIconButton>
            {e.node}
          </HStack>
        );
      })}
      <NewExpressionMenu label="Add" onAddNewExpression={handleAddDirectDescendant} />
    </VStack>
  );
};

export default Scope;
