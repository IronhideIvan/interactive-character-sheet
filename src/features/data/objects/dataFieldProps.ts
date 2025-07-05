import { DataObject } from "@/types/data/dataObject";

export type DataFieldProps = {
  data: DataObject;
  onChange: (newData: DataObject) => void;
  hideLabel?: boolean;
};
