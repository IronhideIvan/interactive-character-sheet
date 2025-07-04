import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IconPickerState = {
  mostRecentColor: string;
};

const initialState: IconPickerState = { mostRecentColor: "#eb5e41" };

export const iconPickerSlice = createSlice({
  name: "iconPicker",
  initialState,
  reducers: {
    setMostRecentColor: (state, action: PayloadAction<string>) => {
      state.mostRecentColor = action.payload;
    },
  },
});

export const { setMostRecentColor } = iconPickerSlice.actions;
