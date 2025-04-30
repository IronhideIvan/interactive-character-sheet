import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { CharacterFeatureSection } from "@/types/character/characterFeature";

export type CharacterFeaturesSlice = {
  latest: CharacterFeatureSection[];
  initial: CharacterFeatureSection[];
};

const initialState: CharacterFeaturesSlice = {
  latest: [],
  initial: [],
};

export const characterFeaturesSlice = createSlice({
  name: "characterFeaturesDataSet",
  initialState,
  reducers: {
    setCharacterFeatures: (state, action: PayloadAction<CharacterFeatureSection[]>) => {
      state.latest = [...action.payload];
    },
    upsertCharacterFeature: (state, action: PayloadAction<CharacterFeatureSection>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteCharacterFeature: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    setInitial: (state, action: PayloadAction<CharacterFeatureSection[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setCharacterFeatures,
  upsertCharacterFeature,
  deleteCharacterFeature,
  resetState,
  setInitial,
} = characterFeaturesSlice.actions;
