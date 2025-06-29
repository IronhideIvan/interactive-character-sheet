import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { GroupCollection } from "@/types/common/groupCollection";

export type GroupCollectionsSlice = {
  latest: GroupCollection[];
  initial: GroupCollection[];
};

const initialState: GroupCollectionsSlice = {
  latest: [],
  initial: [],
};

export const groupCollectionsSlice = createSlice({
  name: "groupCollections",
  initialState,
  reducers: {
    setGroupCollections: (state, action: PayloadAction<GroupCollection[]>) => {
      state.latest = [...action.payload];
    },
    upsertGroupCollection: (state, action: PayloadAction<GroupCollection>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteGroupCollection: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    resetGroupCollection: (state, action: PayloadAction<GroupCollection>) => {
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
    setInitial: (state, action: PayloadAction<GroupCollection[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setGroupCollections,
  upsertGroupCollection,
  deleteGroupCollection,
  resetGroupCollection,
  resetState,
  setInitial,
} = groupCollectionsSlice.actions;
