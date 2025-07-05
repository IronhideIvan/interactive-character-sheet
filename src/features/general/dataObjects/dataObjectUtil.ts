import { CalculationExpression, CalculationExpressionType, CalculationScopeExpression } from "@/types/common/dataCalculation";
import { Dictionary } from "@/types/common/dictionary";
import { DataObjectValueType, DataObjectValue } from "@/types/data/dataObject";
import { v4 } from "uuid";

export const getDefaultDataObjectValueByType = (type: DataObjectValueType): DataObjectValue => {
  switch (type) {
    case DataObjectValueType.Text: return { string: "" };
    case DataObjectValueType.Boolean: return { boolean: false };
    case DataObjectValueType.Markdown: return { string: "" };
    case DataObjectValueType.Number: return { number: 0 };
    case DataObjectValueType.Icon: return { icon: null };
    case DataObjectValueType.Calculation: {
      const rootId = v4();
      const expressions: Dictionary<CalculationExpression> = {};
      const scope: CalculationScopeExpression = {
        id: rootId,
        evaluationScope: [],
        type: CalculationExpressionType.Scope,
      };
      expressions[rootId] = scope;
      return {
        calculation: {
          id: v4(),
          rootExpressionId: rootId,
          variables: {},
          expressions: expressions,
        },
      };
    }
  }
};
