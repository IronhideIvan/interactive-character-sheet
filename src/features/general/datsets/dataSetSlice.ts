import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { DataSetProto } from "@/types/data/dataset";

export type DataSetsSlice = {
  latest: DataSetProto[];
  initial: DataSetProto[];
};

const initialState: DataSetsSlice = {
  latest: [],
  initial: [],
};

export const customGridsSlice = createSlice({
  name: "dataSets",
  initialState,
  reducers: {
    setDataSets: (state, action: PayloadAction<DataSetProto[]>) => {
      state.latest = [...action.payload];
    },
    upsertDataSet: (state, action: PayloadAction<DataSetProto>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteDataSet: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    resetDataSet: (state, action: PayloadAction<DataSetProto>) => {
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
    setInitial: (state, action: PayloadAction<DataSetProto[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setDataSets,
  upsertDataSet,
  deleteDataSet,
  resetDataSet,
  resetState,
  setInitial,
} = customGridsSlice.actions;
