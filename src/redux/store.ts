import { configureStore } from "@reduxjs/toolkit";
import { basicInformationSlice } from "../features/characterSheet/basicInformation/basicInformationSlice";
import { abilityDataSetSlice } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { proficiencyBonusDataSetSlice } from "@/features/dataSets/proficiencyBonuses/proficiencyBonusDataSetSlice";

export const store = configureStore({
  reducer: {
    basicInformation: basicInformationSlice.reducer,
    abilitiesDataSet: abilityDataSetSlice.reducer,
    proficiencyBonusDataSet: proficiencyBonusDataSetSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
