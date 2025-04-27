import { SkillScore } from "@/types/character/skillScore";
import { upsert } from "@/utils/arrayUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash.clonedeep";

export type SkillsState = {
  latest: SkillScore[];
  initial: SkillScore[];
};

const initialState: SkillsState = {
  latest: [],
  initial: [],
};

export const skillScoresSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkillScores: (state, action: PayloadAction<SkillScore[]>) => {
      state.latest = cloneDeep(action.payload);
    },
    upsertSkillScore: (state, action: PayloadAction<SkillScore>) => {
      state.latest = upsert(action.payload, state.latest, item => item.skillId === action.payload.skillId);
    },
    deleteSkillScore: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(ss => ss.skillId !== action.payload);
    },
    setInitial: (state, action: PayloadAction<SkillScore[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setSkillScores,
  upsertSkillScore,
  deleteSkillScore,
  setInitial,
  resetState,
} = skillScoresSlice.actions;
