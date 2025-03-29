export type EditorType = "text" | "icon" | "number";

export type ColumnInfo<T> = {
  key: keyof T;
  name: string;
  type: EditorType;
  readonly?: boolean;
};
