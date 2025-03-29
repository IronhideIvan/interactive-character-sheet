export type EditorType = "text" | "icon";

export type ColumnInfo<T> = {
  key: keyof T;
  name: string;
  type: EditorType;
  readonly?: boolean;
};
