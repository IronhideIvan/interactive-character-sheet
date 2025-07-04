import { EntityBase } from "./entityBase";

export type CustomGrid = EntityBase & {
  name: string;
  headers: CustomGridHeader[];
  rows: CustomGridRow[];
};

export type CustomGridHeader = EntityBase & {
  name: string;
  type: CustomGridCellType;
};

export type CustomGridRow = EntityBase & {
  cells: CustomGridCell[];
};

export type CustomGridCellType = "text" | "boolean" | "number" | "markdown";

export type CustomGridCell = {
  headerId: string;
  type: CustomGridCellType;
  value: CustomGridValue;
};

export type CustomGridValue = {
  boolean?: boolean;
  string?: string;
  number?: number;
};
