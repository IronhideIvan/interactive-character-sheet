import { EntityBase, ID } from "../common/entityBase";
import { Icon } from "./icon";

export type DataSetProto = EntityBase & {
  name: string;
  headers: DataSetHeader[];
  rows: DataSetRow[];
  cells: Map<ID, DataSetCell>;
};

export type DataSetHeader = EntityBase & {
  name: string;
  type: DataSetValueType;
};

export type DataSetRow = EntityBase & {
  cells: DataSetRowCell[];
};

export type DataSetRowCell = {
  cellId: string;
  headerId: string;
};

export type DataSetCell = EntityBase & {
  headerId: string;
  type: DataSetValueType;
  value: DataSetValue;
};

export type DataSetValue = {
  boolean?: boolean;
  string?: string;
  number?: number;
  icon?: Icon | null;
};

export enum DataSetValueType {
  Text = "text",
  Boolean = "boolean",
  Number = "number",
  Markdown = "markdown",
  Icon = "icon"
}
