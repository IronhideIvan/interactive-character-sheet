import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { CustomGrid } from "@/types/common/customGrid";

export type CustomGridsSlice = {
  latest: CustomGrid[];
  initial: CustomGrid[];
};

const initialState: CustomGridsSlice = {
  latest: [],
  initial: [],
};

export const customGridsSlice = createSlice({
  name: "customGrids",
  initialState,
  reducers: {
    setCustomGrids: (state, action: PayloadAction<CustomGrid[]>) => {
      state.latest = [...action.payload];
    },
    upsertCustomGrid: (state, action: PayloadAction<CustomGrid>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteCustomGrid: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    resetCustomGrid: (state, action: PayloadAction<CustomGrid>) => {
      const original = state.initial.find(s => s.id === action.payload.id);
      if (original) {
        state.latest = upsert(cloneDeep(original), state.latest, a => a.id === action.payload.id);
      }
      else {
        state.latest = upsert(
          cloneDeep(action.payload),
          state.latest,
          a => a.id === action.payload.id,
        );
      }
    },
    setInitial: (state, action: PayloadAction<CustomGrid[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setCustomGrids,
  upsertCustomGrid,
  deleteCustomGrid,
  resetCustomGrid,
  resetState,
  setInitial,
} = customGridsSlice.actions;
