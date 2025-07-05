import { ID } from "./entityBase";

export type Dictionary<T> = {
  [id: ID]: T;
};
