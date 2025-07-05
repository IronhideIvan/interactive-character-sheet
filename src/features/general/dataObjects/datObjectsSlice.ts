import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash.clonedeep";
import { DataObject } from "@/types/data/dataObject";
import { Dictionary } from "@/types/common/dictionary";
import { ID } from "@/types/common/entityBase";

export type DataObjectsSlice = {
  latest: Dictionary<DataObject>;
  initial: Dictionary<DataObject>;
};

const initialState: DataObjectsSlice = {
  latest: {},
  initial: {},
};

export const dataObjectsSlice = createSlice({
  name: "dataObjects",
  initialState,
  reducers: {
    setDataObjects: (state, action: PayloadAction<Dictionary<DataObject>>) => {
      state.latest = { ...action.payload };
    },
    upsertDataObject: (state, action: PayloadAction<DataObject>) => {
      state.latest[action.payload.id] = action.payload;
    },
    deleteDataObject: (state, action: PayloadAction<ID>) => {
      delete state.latest[action.payload];
    },
    resetDataObject: (state, action: PayloadAction<DataObject>) => {
      const original = state.initial[action.payload.id];
      if (original) {
        state.latest[original.id] = original;
      }
      else {
        state.latest[action.payload.id] = cloneDeep(action.payload);
      }
    },
    setInitial: (state, action: PayloadAction<Dictionary<DataObject>>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setDataObjects,
  upsertDataObject,
  deleteDataObject: deleteDataSet,
  resetDataObject: resetDataSet,
  resetState,
  setInitial,
} = dataObjectsSlice.actions;
