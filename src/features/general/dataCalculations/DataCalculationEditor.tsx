import { CalculationExpression, CalculationExpressionType, CalculationScopeExpression, DataCalculation } from "@/types/common/dataCalculation";
import { Box, Text } from "@chakra-ui/react";
import { JSX } from "react";
import Scope from "./textViewer/tokenComponents/Scope";
import { Dictionary } from "@/types/common/dictionary";
import { DataFieldProps } from "@/features/data/objects/dataFieldProps";

const DataCalculationEditor = ({ data, onChange }: DataFieldProps): JSX.Element => {
  const calculation: DataCalculation = data.value.calculation ?? { id: "root-id", expressions: {}, rootExpressionId: "" };

  const rootScope = calculation.expressions[calculation.rootExpressionId] as CalculationScopeExpression;
  if (!rootScope || rootScope.type !== CalculationExpressionType.Scope) {
    return <Text>ERROR PARSING CALCULATION EXPRESSION, MISSING OR INVALID ROOT ELEMENT FOUND</Text>;
  }

  const handleExpressionsChange = (newExpressions: Dictionary<CalculationExpression>) => {
    onChange(
      {
        ...data,
        value: {
          calculation: {
            ...calculation,
            expressions: newExpressions,
          },
        },
      },
    );
  };

  return (
    <Box>
      <Scope
        expression={rootScope}
        calculation={calculation}
        onExpressionsChange={handleExpressionsChange}
      />
    </Box>
  );
};

export default DataCalculationEditor;
