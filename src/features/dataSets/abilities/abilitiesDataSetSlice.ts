import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Ability } from "@/types/data/ability";

export type AbilityDataSetState = {
  abilities: Ability[];
};

const initialState: AbilityDataSetState = {
  abilities: [
    {
      id: "str",
      name: "Strength",
    },
    {
      id: "dec",
      name: "Dexterity",
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
  },
});

export const { setAbilities } = abilityDataSetSlice.actions;
