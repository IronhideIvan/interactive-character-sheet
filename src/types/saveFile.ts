import { BasicInformation } from "./character/basicInformation";
import { Ability } from "./data/ability";
import { ProficiencyBonus } from "./data/proficienyBonus";
import { Skill } from "./data/skill";

export type SaveFile = {
  character: {
    basicInformation: BasicInformation;
  };
  data: {
    abilities: Ability[];
    proficiencyBonuses: ProficiencyBonus[];
    skills: Skill[];
  };
};
