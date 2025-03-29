import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { Skill } from "@/types/data/skill";

export type SkillsDataSetState = {
  latest: Skill[];
  initial: Skill[];
};

const initialState: SkillsDataSetState = {
  latest: [],
  initial: [],
};

export const skillsDataSetSliceSlice = createSlice({
  name: "skillsDataSet",
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.latest = [...action.payload];
    },
    upsertSkill: (state, action: PayloadAction<Skill>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    setInitial: (state, action: PayloadAction<Skill[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setSkills,
  upsertSkill,
  deleteSkill,
  resetState,
  setInitial,
} = skillsDataSetSliceSlice.actions;
