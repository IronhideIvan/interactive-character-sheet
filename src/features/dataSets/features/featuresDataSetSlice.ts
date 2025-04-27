import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { Feature } from "@/types/data/feature";

export type FeatureDataSetState = {
  latest: Feature[];
  initial: Feature[];
};

const initialState: FeatureDataSetState = {
  latest: [],
  initial: [],
};

export const FeaturesDataSetSliceSlice = createSlice({
  name: "FeaturesDataSet",
  initialState,
  reducers: {
    setFeatures: (state, action: PayloadAction<Feature[]>) => {
      state.latest = [...action.payload];
    },
    upsertFeature: (state, action: PayloadAction<Feature>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteFeature: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    setInitial: (state, action: PayloadAction<Feature[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setFeatures,
  upsertFeature,
  deleteFeature,
  resetState,
  setInitial,
} = FeaturesDataSetSliceSlice.actions;
