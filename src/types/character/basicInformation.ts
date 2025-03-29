import { ArmorClass } from "./armorClass";
import { CharacterClass } from "./characterClass";
import { DeathSaves } from "./deathSaves";
import { HitDice } from "./hitDice";

export type BasicInformation = {
  name: string;
  characterLevel: number;
  background: string;
  species: string;
  classes: CharacterClass[];
  xp: number;
  hitDice: HitDice[];
  armorClass: ArmorClass;
  deathSaves: DeathSaves;
};
