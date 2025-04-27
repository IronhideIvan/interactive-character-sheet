import { AbilityScore } from "./character/abilityScore";
import { BasicInformation } from "./character/basicInformation";
import { SkillScore } from "./character/skillScore";
import { Ability } from "./data/ability";
import { Feature } from "./data/feature";
import { ProficiencyBonus } from "./data/proficienyBonus";
import { Skill } from "./data/skill";

export type SaveFile = {
  character: {
    basicInformation: BasicInformation;
    abilityScores: AbilityScore[];
    skills: SkillScore[];
  };
  data: {
    abilities: Ability[];
    proficiencyBonuses: ProficiencyBonus[];
    skills: Skill[];
    features: Feature[];
  };
};
