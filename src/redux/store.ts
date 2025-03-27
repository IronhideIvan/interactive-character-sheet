import { configureStore } from "@reduxjs/toolkit";
import basicInformationReducer from "../features/characterSheet/basicInformation/basicInformationSlice";

export const store = configureStore({
  reducer: {
    basicInformation: basicInformationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
