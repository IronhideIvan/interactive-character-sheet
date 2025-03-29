import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BasicInformation } from "../../../types/character/basicInformation";
import cloneDeep from "lodash.clonedeep";

export type BasicInformationState = {
  latest: BasicInformation;
  initial: BasicInformation;
};

const initialState: BasicInformationState = {
  latest: { name: "" },
  initial: { name: "" },
};

export const basicInformationSlice = createSlice({
  name: "basicInformation",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.latest.name = action.payload;
    },
    setInitial: (state, action: PayloadAction<BasicInformation>) => {
      state.initial = cloneDeep(action.payload);
    },
    resetState: (state) => {
      state.initial = cloneDeep(state.latest);
    },
  },
});

export const { setName, resetState, setInitial } = basicInformationSlice.actions;

export default basicInformationSlice.reducer;
