import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BasicInformation } from "../../../types/character/basicInformation";
import cloneDeep from "lodash.clonedeep";
import { CharacterClass } from "@/types/character/characterClass";
import { HitDice } from "@/types/character/hitDice";
import { ArmorClass } from "@/types/character/armorClass";
import { DeathSaves } from "@/types/character/deathSaves";
import { HitPoints } from "@/types/character/hitPoints";

export type BasicInformationState = {
  latest: BasicInformation;
  initial: BasicInformation;
};

const baseInformation: BasicInformation = {
  name: "",
  characterLevel: 0,
  background: "",
  species: "",
  classes: [],
  xp: 0,
  hitDice: [],
  hitPoints: {
    temp: 0,
    current: 0,
    max: 0,
  },
  armorClass: {
    totalAc: 0,
  },
  deathSaves: {
    max: 3,
    successCount: 0,
    failCount: 0,
  },
};

const initialState: BasicInformationState = {
  latest: cloneDeep(baseInformation),
  initial: cloneDeep(baseInformation),
};

export const basicInformationSlice = createSlice({
  name: "basicInformation",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.latest.name = action.payload;
    },
    setBackground: (state, action: PayloadAction<string>) => {
      state.latest.background = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string>) => {
      state.latest.species = action.payload;
    },
    setCharacterLevel: (state, action: PayloadAction<number>) => {
      state.latest.characterLevel = action.payload;
    },
    setXP: (state, action: PayloadAction<number>) => {
      state.latest.xp = action.payload;
    },
    setHP: (state, action: PayloadAction<HitPoints>) => {
      state.latest.hitPoints = { ...action.payload };
    },
    setArmorClass: (state, action: PayloadAction<ArmorClass>) => {
      state.latest.armorClass = action.payload;
    },
    setDeathSaves: (state, action: PayloadAction<DeathSaves>) => {
      state.latest.deathSaves = action.payload;
    },
    setClasses: (state, action: PayloadAction<CharacterClass[]>) => {
      state.latest.classes = [...action.payload];
    },
    setHitDice: (state, action: PayloadAction<HitDice[]>) => {
      state.latest.hitDice = [...action.payload];
    },
    setInitial: (state, action: PayloadAction<BasicInformation>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setName,
  resetState,
  setInitial,
  setSpecies,
  setCharacterLevel,
  setXP,
  setHP,
  setArmorClass,
  setDeathSaves,
  setClasses,
  setHitDice,
  setBackground,
} = basicInformationSlice.actions;

export default basicInformationSlice.reducer;
