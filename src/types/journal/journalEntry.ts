import { EntityBase } from "../common/entityBase";

export type JournalEntry = EntityBase & {
  name: string;
  contents: string;
};
