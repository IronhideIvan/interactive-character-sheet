import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { CharacterFeatureGroup } from "@/types/character/characterFeature";

export type CharacterFeaturesSlice = {
  latest: CharacterFeatureGroup[];
  initial: CharacterFeatureGroup[];
};

const initialState: CharacterFeaturesSlice = {
  latest: [],
  initial: [],
};

export const characterFeaturesSlice = createSlice({
  name: "characterFeaturesDataSet",
  initialState,
  reducers: {
    setCharacterFeatures: (state, action: PayloadAction<CharacterFeatureGroup[]>) => {
      state.latest = [...action.payload];
    },
    upsertCharacterFeature: (state, action: PayloadAction<CharacterFeatureGroup>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteCharacterFeature: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    resetCharacterFeature: (state, action: PayloadAction<CharacterFeatureGroup>) => {
      const original = state.initial.find(s => s.id === action.payload.id);
      if (original) {
        state.latest = upsert(cloneDeep(original), state.latest, a => a.id === action.payload.id);
      }
      else {
        state.latest = upsert(
          {
            ...cloneDeep(action.payload),
            features: [],
          },
          state.latest,
          a => a.id === action.payload.id,
        );
      }
    },
    setInitial: (state, action: PayloadAction<CharacterFeatureGroup[]>) => {
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
  resetCharacterFeature,
  resetState,
  setInitial,
} = characterFeaturesSlice.actions;
