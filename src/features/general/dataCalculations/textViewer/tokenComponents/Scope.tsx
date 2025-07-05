import { CalculationExpression, CalculationExpressionType, CalculationScopeExpression, CalculationVariableDeclarationExpression, DataCalculation } from "@/types/common/dataCalculation";
import { HStack, VStack } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import { scopeIndentMargin } from "./textStyles";
import { ID } from "@/types/common/entityBase";
import VariableDeclaration from "./VariableDeclaration";
import LinkingText from "./LinkingText";
import ConfirmIconButton from "@/components/ConfirmIconButton";
import { FaTrash } from "react-icons/fa";
import NewExpressionMenu from "../editors/NewExpressionMenu";
import { Dictionary } from "@/types/common/dictionary";

type ScopeProps = {
  expression: CalculationScopeExpression;
  calculation: DataCalculation;
  onExpressionsChange: (newExpressions: Dictionary<CalculationExpression>) => void;
};

const Scope = ({ expression, calculation, onExpressionsChange }: ScopeProps): JSX.Element => {
  const handleAddDirectDescendant = (newExpression: CalculationExpression) => {
    const newExpressionDict = { ...calculation.expressions };
    const newScope: CalculationScopeExpression = {
      ...expression,
      evaluationScope: [
        ...expression.evaluationScope,
        newExpression.id,
      ],
    };
    newExpressionDict[newExpression.id] = newExpression;
    newExpressionDict[newScope.id] = newScope;
    onExpressionsChange(newExpressionDict);
  };

  const handleDeleteDirectDescendant = (id: ID) => {
    const newExpressionDict = { ...calculation.expressions };
    const newScope: CalculationScopeExpression = {
      ...expression,
      evaluationScope: expression.evaluationScope.filter(existingId => existingId !== id),
    };

    delete newExpressionDict[id];
    newExpressionDict[newScope.id] = newScope;
    onExpressionsChange(newExpressionDict);
  };

  const handleChildExpressionChange = (updatedExpression: CalculationExpression) => {
    const newExpressionDict = { ...calculation.expressions };
    newExpressionDict[updatedExpression.id] = updatedExpression;
    onExpressionsChange(newExpressionDict);
  };

  const scopedExpressions: {
    id: ID; node: ReactNode;
  }[] = [];
  expression.evaluationScope.forEach((id) => {
    const expr = calculation.expressions[id];
    if (expr) {
      const scopedExp: {
        id: ID; node: ReactNode;
      } = { id: expr.id, node: <></> };

      switch (expr.type) {
        case CalculationExpressionType.VariableDeclaration:
        {
          const castExp = expr as CalculationVariableDeclarationExpression;
          scopedExp.node = <VariableDeclaration expression={castExp} onChange={handleChildExpressionChange} />;
          break;
        }
        case CalculationExpressionType.Scope: {
          const castExp = expr as CalculationScopeExpression;
          scopedExp.node = (
            <Scope
              expression={castExp}
              calculation={calculation}
              onExpressionsChange={onExpressionsChange}
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
