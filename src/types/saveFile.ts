import { AbilityScore } from "./character/abilityScore";
import { BasicInformation } from "./character/basicInformation";
import { CharacterFeatureGroup } from "./character/characterFeature";
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
    features: CharacterFeatureGroup[];
  };
  data: {
    abilities: Ability[];
    proficiencyBonuses: ProficiencyBonus[];
    skills: Skill[];
    features: Feature[];
  };
};
