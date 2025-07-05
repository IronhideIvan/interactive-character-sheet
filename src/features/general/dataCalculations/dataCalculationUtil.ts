import { CalculationValue, CalculationValueType } from "@/types/common/dataCalculation";

export const buildDefaultCalculationValueOfType = (type: CalculationValueType): CalculationValue => {
  switch (type) {
    case CalculationValueType.Number: return { type: type, number: 0 };
  }
};
