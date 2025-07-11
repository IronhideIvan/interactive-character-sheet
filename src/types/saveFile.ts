import { AbilityScore } from "./character/abilityScore";
import { BasicInformation } from "./character/basicInformation";
import { CharacterFeature, CharacterFeatureGroup } from "./character/characterFeature";
import { SkillScore } from "./character/skillScore";
import { CustomGrid } from "./common/customGrid";
import { CustomNote } from "./common/customNote";
import { GroupCollection } from "./common/groupCollection";
import { Ability } from "./data/ability";
import { Feature } from "./data/feature";
import { ProficiencyBonus } from "./data/proficiencyBonus";
import { Skill } from "./data/skill";
import { JournalEntry } from "./journal/journalEntry";

export type SaveFile = {
  character: {
    basicInformation: BasicInformation;
    abilityScores: AbilityScore[];
    skills: SkillScore[];
    features: CharacterFeature[];
    featureGroups: CharacterFeatureGroup[];
  };
  data: {
    abilities: Ability[];
    proficiencyBonuses: ProficiencyBonus[];
    skills: Skill[];
    features: Feature[];
    groupCollections: GroupCollection[];
  };
  general: {
    customNotes: CustomNote[];
    customGrids: CustomGrid[];
  };
  journalEntries: JournalEntry[];
  version: {
    major: number;
    minor: number;
    patch: number;
  };
};
