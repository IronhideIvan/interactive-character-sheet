import { CalculationExpression, CalculationExpressionType, CalculationValue, CalculationValueType, CalculationVariable, CalculationVariableDeclarationExpression, DataCalculation } from "@/types/common/dataCalculation";
import { ID } from "@/types/common/entityBase";
import cloneDeep from "lodash.clonedeep";

export const buildDefaultCalculationValueOfType = (type: CalculationValueType): CalculationValue => {
  switch (type) {
    case CalculationValueType.Number: return { type: type, number: 0 };
  }
};

export class CalculationAggregate {
  private calculation: DataCalculation;

  constructor(calculation: DataCalculation) {
    this.calculation = cloneDeep(calculation);
  }

  upsertVariable(newVariable: CalculationVariable): void {
    this.calculation.variables[newVariable.id] = newVariable;
  }

  deleteVariable(idToDelete: ID): void {
    delete this.calculation.variables[idToDelete];
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
    if (exprToDelete && exprToDelete.type === CalculationExpressionType.VariableDeclaration) {
      const decl = exprToDelete as CalculationVariableDeclarationExpression;
      this.deleteVariable(decl.variable.id);
    }

    delete this.calculation.expressions[idToDelete];
  }

  getTransformation(): DataCalculation {
    return this.calculation;
  }
}
