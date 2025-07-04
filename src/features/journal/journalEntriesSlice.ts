import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { upsert } from "@/utils/arrayUtils";
import cloneDeep from "lodash.clonedeep";
import { JournalEntry } from "@/types/journal/journalEntry";

export type JournalEntriesState = {
  latest: JournalEntry[];
  initial: JournalEntry[];
};

const initialState: JournalEntriesState = {
  latest: [],
  initial: [],
};

export const journalEntriesSlice = createSlice({
  name: "JournalEntries",
  initialState,
  reducers: {
    setJournalEntries: (state, action: PayloadAction<JournalEntry[]>) => {
      state.latest = [...action.payload];
    },
    upsertJournalEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.latest = upsert(action.payload, state.latest, a => a.id === action.payload.id);
    },
    deleteJournalEntry: (state, action: PayloadAction<string>) => {
      state.latest = state.latest.filter(a => a.id !== action.payload);
    },
    setInitial: (state, action: PayloadAction<JournalEntry[]>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.latest = cloneDeep(state.initial);
    },
  },
});

export const {
  setJournalEntries,
  upsertJournalEntry,
  deleteJournalEntry,
  resetState,
  setInitial,
} = journalEntriesSlice.actions;
