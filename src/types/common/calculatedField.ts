export type CalculatedField = {
  expressions: CalculationExpression[];
};

export enum DataReferenceKey {
  Features = "features",
  BasicInformation = "basic-info",
  Skills = "skills",
  Abilities = "abilities"
}

export enum CalculationExpressionType {
  Scope = "scope",
  Operation = "op",
  Condition = "condition",
  Value = "value"
}

export type CalculationExpression = {
  type: CalculationExpressionType;
};

export type CalculationExpressionScope = CalculationExpression & {
  expressions: CalculationExpression[];
};

export enum CalculationOperatorType {
  Add = "add"
}

export type CalculationExpressionOperation = CalculationExpression & {
  operator: CalculationOperatorType;
  value: CalculationValue;
};

export enum CalculationConditionType {
  IsTrue = "is",
  IsFalse = "is-not"
}

export type CalculationExpressionCondition = CalculationExpression & {
  left: CalculationValue;
  operator: CalculationConditionType;
  right: CalculationBooleanValue;
};

export enum CalculationValueType {
  Number = "number",
  Boolean = "bool",
  Reference = "ref"
}

export type CalculationValue = {
  type: CalculationValueType;
};

export type CalculationReferenceValue = CalculationValue & {
  datasetKey: DataReferenceKey;
  referenceId: string;
  referenceProperty: string;
};

export type CalculationNumberValue = CalculationValue & {
  value: number;
};

export type CalculationBooleanValue = CalculationValue & {
  value: boolean;
};
