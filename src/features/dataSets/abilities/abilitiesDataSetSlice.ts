import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Ability } from "@/types/data/ability";
import { upsert } from "@/utils/arrayUtils";

export type AbilityDataSetState = {
  abilities: Ability[];
};

const initialState: AbilityDataSetState = {
  abilities: [
    {
      id: "str",
      name: "Strength",
      abbreviation: "STR",
    },
    {
      id: "dec",
      name: "Dexterity",
      abbreviation: "DEX",
    },
  ],
};

export const abilityDataSetSlice = createSlice({
  name: "abilityDataSet",
  initialState,
  reducers: {
    setAbilities: (state, action: PayloadAction<Ability[]>) => {
      state.abilities = [...action.payload];
    },
    upsertAbility: (state, action: PayloadAction<Ability>) => {
      state.abilities = upsert(action.payload, state.abilities, a => a.id === action.payload.id);
    },
    deleteAbility: (state, action: PayloadAction<string>) => {
      state.abilities = state.abilities.filter(a => a.id !== action.payload);
    },
  },
});

export const { setAbilities, upsertAbility, deleteAbility } = abilityDataSetSlice.actions;
