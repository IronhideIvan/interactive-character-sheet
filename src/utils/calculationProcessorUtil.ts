import { CalculatedField,
  CalculationBooleanValue,
  CalculationNumberValue,
  CalculationValue,
  CalculationValueType } from "@/types/common/calculatedField";

class CalculationProcessor {
  processField(field: CalculatedField): number {
    return 0;
  }

  private getNumberValue(calculationValue: CalculationValue): number {
    if (calculationValue.type !== CalculationValueType.Number) {
      throw new Error(this.getErrorMessage("expected number type", calculationValue));
    }

    const calcNumber = calculationValue as CalculationNumberValue;
    const val = calcNumber.value;
    if (val === undefined || val === null) {
      throw new Error(this.getErrorMessage("No number value provided", calculationValue));
    }

    if (typeof val !== "number" || Number.isNaN(val)) {
      throw new Error(this.getErrorMessage("value is not a number", calculationValue));
    }

    if (!Number.isFinite(val)) {
      throw new Error(this.getErrorMessage("value must be finite", calculationValue));
    }

    if (!Number.isSafeInteger(val)) {
      throw new Error(this.getErrorMessage("value must be an integer", calculationValue));
    }

    return val;
  }

  private getBooleanValue(calculationValue: CalculationValue): boolean {
    if (calculationValue.type !== CalculationValueType.Boolean) {
      throw new Error(this.getErrorMessage("expected boolean type", calculationValue));
    }

    const calcBool = calculationValue as CalculationBooleanValue;
    if (calcBool.value === undefined || calcBool.value === null) {
      throw new Error(this.getErrorMessage("No boolean value provided", calculationValue));
    }

    if (typeof calcBool.value !== "boolean") {
      throw new Error(this.getErrorMessage("value is not a boolean", calculationValue));
    }

    if (calcBool.value === true) {
      return true;
    }
    else if (calcBool.value === false) {
      return false;
    }
    else {
      throw new Error(this.getErrorMessage("unknown boolean value provided", calculationValue));
    }
  }

  private getErrorMessage(message: string, referenceObject: unknown) {
    return `Processing Calculation Failed. Message '${message}', `
      + `Reference '${JSON.stringify(referenceObject)}'`;
  }
}

export const getCalculatedFieldResult = (field: CalculatedField): number => {
  const processor = new CalculationProcessor();
  try {
    return processor.processField(field);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any) {
    if (err.message && typeof err.message === "string") {
      console.warn(err.message);
    }
    else {
      console.error(err);
    }
    return Number.NaN;
  }
};
