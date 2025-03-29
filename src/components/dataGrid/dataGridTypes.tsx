export type EditorType = "readonly" | "text";

export type ColumnInfo<T> = {
  key: keyof T;
  name: string;
  type: EditorType;
};
