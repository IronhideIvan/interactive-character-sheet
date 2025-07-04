export type EditorType = "text" | "icon" | "number" | "reference" | "markdown" | "boolean";

export type ColumnInfo<T> = {
  key: keyof T;
  name: string;
  type: EditorType;
  readonly?: boolean;
  minWidth?: string;
};
