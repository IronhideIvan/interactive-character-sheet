import { EntityBase } from "../common/entityBase";
import { Icon } from "./icon";

export type Skill = EntityBase & {
  name: string;
  icon?: Icon;
  abilityId?: string;
};
