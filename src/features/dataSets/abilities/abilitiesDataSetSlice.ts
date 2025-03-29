import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Ability } from "@/types/data/ability";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";

export type AbilityDataSetState = {
  latest: Ability[];
  initial: Ability[];
};

const initialState: AbilityDataSetState = {
  latest: [],
  initial: [],
};

export const abilityDataSetSlice = createSlice({
  name: "abilityDataSet",
  initialState,
  reducers: {
    setAbilities: (state, action: PayloadAction<Ability[]>) => {
      state.latest = [...action.payload];
    },
    upsertAbility: (state, action: PayloadAction<Ability>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteAbility: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    setInitial: (state, action: PayloadAction<Ability[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const { setAbilities, upsertAbility, deleteAbility, resetState, setInitial } = abilityDataSetSlice.actions;
