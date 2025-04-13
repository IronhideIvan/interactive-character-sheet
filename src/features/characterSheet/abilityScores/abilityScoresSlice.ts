import { AbilityScore } from "@/types/character/abilityScore";
import { upsert } from "@/utils/arrayUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash.clonedeep";

export type AbilityScoresState = {
  latest: AbilityScore[];
  initial: AbilityScore[];
};

const initialState: AbilityScoresState = {
  latest: [],
  initial: [],
};

export const abilityScoresSlice = createSlice({
  name: "abilityScores",
  initialState,
  reducers: {
    upsertAbility: (state, action: PayloadAction<AbilityScore>) => {
      state.latest = upsert(action.payload, state.latest, item => item.abilityId === action.payload.abilityId);
    },
    setInitial: (state, action: PayloadAction<AbilityScore[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  upsertAbility,
  setInitial,
  resetState,
} = abilityScoresSlice.actions;
