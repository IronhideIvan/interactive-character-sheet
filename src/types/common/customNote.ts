import { DataCalculation } from "./dataCalculation";
import { EntityBase } from "./entityBase";

export type CustomNoteType = "text" | "boolean" | "number";

export type CustomNote = EntityBase & {
  parentId: string;
  type: CustomNoteType;
  value: CustomNoteValue;
  name: string;
};

export type CustomNoteValue = {
  boolean?: boolean;
  string?: string;
  number?: number;
  calculation?: DataCalculation;
};
