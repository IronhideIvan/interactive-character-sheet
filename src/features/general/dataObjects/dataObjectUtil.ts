import { DataObjectValueType, DataObjectValue } from "@/types/data/dataObject";

export const getDefaultDataObjectValueByType = (type: DataObjectValueType): DataObjectValue => {
  switch (type) {
    case DataObjectValueType.Text: return { string: "" };
    case DataObjectValueType.Boolean: return { boolean: false };
    case DataObjectValueType.Markdown: return { string: "" };
    case DataObjectValueType.Number: return { number: 0 };
    case DataObjectValueType.Icon: return { icon: null };
  }
};
