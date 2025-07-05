import { Dictionary } from "../common/dictionary";
import { EntityBase } from "../common/entityBase";
import { DataObjectValue, DataObjectValueType } from "./dataObject";

export type DataSetProto = EntityBase & {
  name: string;
  headers: DataSetHeader[];
  rows: DataSetRow[];
  cells: Dictionary<DataSetCell>;
};

export type DataSetHeader = EntityBase & {
  name: string;
  type: DataObjectValueType;
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
  type: DataObjectValueType;
  value: DataObjectValue;
};
