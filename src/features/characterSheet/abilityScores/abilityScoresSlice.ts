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
    setAbilityScores: (state, action: PayloadAction<AbilityScore[]>) => {
      state.latest = cloneDeep(action.payload);
    },
    upsertAbilityScore: (state, action: PayloadAction<AbilityScore>) => {
      state.latest = upsert(action.payload, state.latest, item => item.abilityId === action.payload.abilityId);
    },
    deleteAbilityScore: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(as => as.abilityId !== action.payload);
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
  setAbilityScores,
  upsertAbilityScore,
  deleteAbilityScore,
  setInitial,
  resetState,
} = abilityScoresSlice.actions;
