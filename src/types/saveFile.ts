import { BasicInformation } from "./character/basicInformation";
import { Ability } from "./data/ability";
import { ProficiencyBonus } from "./data/proficienyBonus";

export type SaveFile = {
  character: {
    basicInformation: BasicInformation;
  };
  data: {
    abilities: Ability[];
    proficiencyBonuses: ProficiencyBonus[];
  };
};
