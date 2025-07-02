import { CustomNoteType, CustomNoteValue } from "./customNote";
import { EntityBase } from "./entityBase";

export type CustomGrid = EntityBase & {
  parentId: string;
  headers: CustomGridHeader[];
  rows: CustomGridRow[];
};

export type CustomGridHeader = EntityBase & {
  name: string;
  type: CustomNoteType;
};

export type CustomGridRow = EntityBase & {
  cells: CustomGridCell[];
};

export type CustomGridCell = {
  headerId: string;
  value: CustomNoteValue;
};
