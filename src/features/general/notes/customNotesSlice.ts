import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { CustomNote } from "@/types/common/customNote";

export type CustomNotesSlice = {
  latest: CustomNote[];
  initial: CustomNote[];
};

const initialState: CustomNotesSlice = {
  latest: [],
  initial: [],
};

export const customNotesSlice = createSlice({
  name: "customNotes",
  initialState,
  reducers: {
    setCustomNotes: (state, action: PayloadAction<CustomNote[]>) => {
      state.latest = [...action.payload];
    },
    upsertCustomNote: (state, action: PayloadAction<CustomNote>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteCustomNote: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    resetCustomNote: (state, action: PayloadAction<CustomNote>) => {
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
    setInitial: (state, action: PayloadAction<CustomNote[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setCustomNotes,
  upsertCustomNote,
  deleteCustomNote,
  resetCustomNote,
  resetState,
  setInitial,
} = customNotesSlice.actions;
