import { Dictionary } from "./dictionary";
import { EntityBase, ID } from "./entityBase";

export type DataCalculation = EntityBase & {
  rootExpressionId: ID;
  variables: Dictionary<CalculationVariable>;
  expressions: Dictionary<CalculationExpression>;
};

export type CalculationExpression = EntityBase & {
  type: CalculationExpressionType;
};

export type CalculationScopeExpression = CalculationExpression & {
  evaluationScope: ID[];
};

export enum CalculationExpressionType {
  Scope = "scope",
  // Operation = "op",
  // Condition = "condition",
  VariableAssignment = "ass",
  VariableDeclaration = "var-decl"
}

export type CalculationVariableDeclarationExpression = CalculationExpression & {
  variable: CalculationVariable;
  value: CalculationValue;
};

export type CalculationVariableAssignmentExpression = CalculationExpression & {
  variableId: ID;
  value: CalculationValue;
};

export enum CalculationValueType {
  Number = "number"
}

export type CalculationVariable = EntityBase & {
  name: string;
  type: CalculationValueType;
};

export type CalculationValue = {
  type: CalculationValueType;
  number?: number;
};

// export type CalculationExpressionScope = CalculationExpression & {
//   expressions: CalculationExpression[];
// };

// export enum CalculationOperatorType {
//   Add = "add"
// }

// export type CalculationExpressionOperation = CalculationExpression & {
//   operator: CalculationOperatorType;
//   value: CalculationValue;
// };

// export enum CalculationConditionType {
//   IsTrue = "is",
//   IsFalse = "is-not"
// }

// export type CalculationExpressionCondition = CalculationExpression & {
//   left: CalculationValue;
//   operator: CalculationConditionType;
//   right: CalculationBooleanValue;
// };

// export type CalculationReferenceValue = CalculationValue & {
//   datasetKey: DataReferenceKey;
//   referenceId: string;
//   referenceProperty: string;
// };
