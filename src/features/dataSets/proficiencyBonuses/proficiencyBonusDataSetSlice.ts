import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { ProficiencyBonus } from "@/types/data/proficiencyBonus";

export type ProficiencyBonusDataSetState = {
  latest: ProficiencyBonus[];
  initial: ProficiencyBonus[];
};

const initialState: ProficiencyBonusDataSetState = {
  latest: [],
  initial: [],
};

export const proficiencyBonusDataSetSlice = createSlice({
  name: "proficiencyBonusDataSet",
  initialState,
  reducers: {
    setBonuses: (state, action: PayloadAction<ProficiencyBonus[]>) => {
      state.latest = [...action.payload];
    },
    upsertBonus: (state, action: PayloadAction<ProficiencyBonus>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteBonus: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    setInitial: (state, action: PayloadAction<ProficiencyBonus[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const { setBonuses, upsertBonus, deleteBonus, resetState, setInitial } = proficiencyBonusDataSetSlice.actions;
