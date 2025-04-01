import { ArmorClass } from "./armorClass";
import { CharacterClass } from "./characterClass";
import { DeathSaves } from "./deathSaves";
import { HitDice } from "./hitDice";
import { HitPoints } from "./hitPoints";

export type BasicInformation = {
  name: string;
  characterLevel: number;
  background: string;
  species: string;
  classes: CharacterClass[];
  xp: number;
  hitDice: HitDice[];
  hitPoints: HitPoints;
  armorClass: ArmorClass;
  deathSaves: DeathSaves;
};
