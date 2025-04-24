export enum ProficiencyLevel {
  None = "none",
  Proficiency = "prof",
  Expertise = "exp"
}

export type Score = {
  baseValue: number;
  proficiencyLevel: ProficiencyLevel;
};
