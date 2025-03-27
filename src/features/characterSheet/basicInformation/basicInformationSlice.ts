import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BasicInformation } from "../../../types/character/basicInformation";

export type BasicInformationState = BasicInformation & {
};

const initialState: BasicInformationState = {
  name: "",
};

export const basicInformationSlice = createSlice({
  name: "basicInformation",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = basicInformationSlice.actions;

export default basicInformationSlice.reducer;
