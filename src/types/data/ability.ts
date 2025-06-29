import { EntityBase } from "../common/entityBase";
import { Icon } from "./icon";

export type Ability = EntityBase & {
  name: string;
  abbreviation: string;
  icon?: Icon;
};
