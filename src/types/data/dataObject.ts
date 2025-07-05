import { DataCalculation } from "../common/dataCalculation";
import { EntityBase } from "../common/entityBase";
import { Icon } from "./icon";

export type DataObject = EntityBase & {
  name: string;
  type: DataObjectValueType;
  value: DataObjectValue;
};

export type DataObjectValue = {
  boolean?: boolean;
  string?: string;
  number?: number;
  icon?: Icon | null;
  calculation?: DataCalculation;
};

export enum DataObjectValueType {
  Text = "text",
  Boolean = "boolean",
  Number = "number",
  Markdown = "markdown",
  Icon = "icon",
  Calculation = "calc"
}
