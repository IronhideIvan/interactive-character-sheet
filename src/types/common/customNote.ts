import { CalculatedField } from "./calculatedField";

export type CustomNoteType = "text" | "boolean" | "number";

export type CustomNote = {
  id: string;
  type: CustomNoteType;
  value: CustomNoteValue;
  name: string;
};

export type CustomNoteValue = {
  boolean?: boolean;
  string?: string;
  number?: number;
  calculation?: CalculatedField;
};
