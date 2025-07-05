import { CalculationValue, CalculationValueType } from "@/types/common/dataCalculation";
import { JSX } from "react";
import InlineNumberEditor from "./InlineNumberEditor";

type CalculationValueEditorProps = {
  calculationValue: CalculationValue;
  onChange: (newValue: CalculationValue) => void;
};

const CalculationValueEditor = ({ calculationValue, onChange }: CalculationValueEditorProps): JSX.Element => {
  switch (calculationValue.type) {
    case CalculationValueType.Number:
    {
      const handleNumberChange = (value: number) => {
        onChange({
          type: calculationValue.type,
          number: value,
        });
      };
      return <InlineNumberEditor value={calculationValue.number ?? 0} onValueChanged={handleNumberChange} />;
    }
  }
};

export default CalculationValueEditor;
