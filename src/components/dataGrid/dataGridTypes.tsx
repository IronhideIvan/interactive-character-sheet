export enum EditorType {
  Text = "text",
  Icon = "icon",
  Number = "number",
  Reference = "reference",
  Markdown = "markdown",
  Boolean = "boolean"
}

export type ColumnInfo<T> = {
  key: keyof T;
  name: string;
  type: EditorType;
  readonly?: boolean;
  minWidth?: string;
};
