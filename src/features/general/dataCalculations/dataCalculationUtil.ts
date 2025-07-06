import { CalculationEvaluationExpression, CalculationExpression, CalculationExpressionType, CalculationOperatorExpression, CalculationScopeExpression, CalculationValue, CalculationValueType, CalculationVariable, CalculationVariableAssignmentExpression, CalculationVariableDeclarationExpression, DataCalculation } from "@/types/common/dataCalculation";
import { ID } from "@/types/common/entityBase";
import cloneDeep from "lodash.clonedeep";

export const buildDefaultCalculationValueOfType = (type: CalculationValueType): CalculationValue => {
  switch (type) {
    case CalculationValueType.Number: return { type: type, number: 0 };
    case CalculationValueType.Variable: return { type: type, refId: "" };
  }
};

export const getCalculationValueDisplayText = (
  value: CalculationValue, calculation: DataCalculation,
): string => {
  switch (value.type) {
    case CalculationValueType.Number: return value.number?.toString() ?? "0";
    case CalculationValueType.Variable: {
      const refVar = calculation.variables[value.refId ?? ""];
      return refVar?.name ?? "N/A";
    }
    default:
      return `UNKNOWN VALUE TYPE: ${value.type}`;
  }
};

export class CalculationAggregate {
  private calculation: DataCalculation;

  constructor(calculation: DataCalculation) {
    this.calculation = cloneDeep(calculation);
  }

  upsertExpressions(newExpressions: CalculationExpression[]): void {
    newExpressions.forEach((e) => {
      this.upsertExpression(e);
    });
  }

  upsertExpression(newExpression: CalculationExpression): void {
    if (newExpression.type === CalculationExpressionType.VariableDeclaration) {
      const decl = newExpression as CalculationVariableDeclarationExpression;
      this.upsertVariable(decl.variable);
    }

    this.calculation.expressions[newExpression.id] = newExpression;
  }

  deleteExpression(idToDelete: ID): void {
    const exprToDelete = this.calculation.expressions[idToDelete];
    if (!exprToDelete) {
      return;
    }

    if (exprToDelete.type === CalculationExpressionType.VariableDeclaration) {
      this.deleteVariableDeclarationExpression(exprToDelete as CalculationVariableDeclarationExpression);
    }
    else if (exprToDelete.type === CalculationExpressionType.Evaluation) {
      this.deleteEvaluationExpression(exprToDelete as CalculationEvaluationExpression);
    }
    else if (exprToDelete.type === CalculationExpressionType.Operator) {
      this.deleteOperatorExpression(exprToDelete as CalculationOperatorExpression);
    }
    else if (exprToDelete.type === CalculationExpressionType.Scope) {
      this.deleteScopeExpression(exprToDelete as CalculationScopeExpression);
    }
    else if (exprToDelete.type === CalculationExpressionType.VariableAssignment) {
      this.deleteVariableAssignmentExpression(exprToDelete as CalculationVariableAssignmentExpression);
    }
    else {
      delete this.calculation.expressions[idToDelete];
    }
  }

  addChildExpression(parent: CalculationExpression, child: CalculationExpression): void {
    this.upsertExpression(child);

    if (parent.type === CalculationExpressionType.Evaluation) {
      const cast = parent as CalculationEvaluationExpression;
      const newExpr: CalculationEvaluationExpression = {
        ...cast,
        operationIds: [
          ...cast.operationIds,
          child.id,
        ],
      };
      this.upsertExpression(newExpr);
    }
    else if (parent.type === CalculationExpressionType.Scope) {
      const cast = parent as CalculationScopeExpression;
      const newExpr: CalculationScopeExpression = {
        ...cast,
        evaluationScope: [
          ...cast.evaluationScope,
          child.id,
        ],
      };
      this.upsertExpression(newExpr);
    }
  }

  deleteChildExpression(parent: CalculationExpression, childIdToDelete: ID) {
    this.deleteExpression(childIdToDelete);

    if (parent.type === CalculationExpressionType.Evaluation) {
      const cast = parent as CalculationEvaluationExpression;
      const newExpr: CalculationEvaluationExpression = {
        ...cast,
        operationIds: cast.operationIds.filter(id => id !== childIdToDelete),
      };
      this.upsertExpression(newExpr);
    }
    else if (parent.type === CalculationExpressionType.Scope) {
      const cast = parent as CalculationScopeExpression;
      const newExpr: CalculationScopeExpression = {
        ...cast,
        evaluationScope: cast.evaluationScope.filter(existingId => existingId !== childIdToDelete),
      };
      this.upsertExpression(newExpr);
    }
  }

  getTransformation(): DataCalculation {
    return this.calculation;
  }

  private deleteScopeExpression(exp: CalculationScopeExpression) {
    delete this.calculation.expressions[exp.id];

    exp.evaluationScope.forEach((id) => {
      const exp = this.calculation.expressions[id];
      if (exp) {
        this.deleteExpression(exp.id);
      }
    });
  }

  private deleteVariableDeclarationExpression(exp: CalculationVariableDeclarationExpression) {
    delete this.calculation.expressions[exp.id];
    this.deleteVariable(exp.variable.id);
  }

  private deleteEvaluationExpression(exp: CalculationEvaluationExpression) {
    delete this.calculation.expressions[exp.id];

    exp.operationIds.forEach((id) => {
      this.deleteExpression(id);
    });
  }

  private deleteOperatorExpression(exp: CalculationOperatorExpression) {
    delete this.calculation.expressions[exp.id];
  }

  private deleteVariableAssignmentExpression(exp: CalculationVariableAssignmentExpression) {
    delete this.calculation.expressions[exp.id];
    this.deleteExpression(exp.evaluationId);
  }

  private upsertVariable(newVariable: CalculationVariable): void {
    this.calculation.variables[newVariable.id] = newVariable;
  }

  private deleteVariable(idToDelete: ID): void {
    delete this.calculation.variables[idToDelete];
  }
}
