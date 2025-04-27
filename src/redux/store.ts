import { configureStore } from "@reduxjs/toolkit";
import { basicInformationSlice } from "../features/characterSheet/basicInformation/basicInformationSlice";
import { abilityDataSetSlice } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { proficiencyBonusDataSetSlice } from "@/features/dataSets/proficiencyBonuses/proficiencyBonusDataSetSlice";
import { skillsDataSetSliceSlice } from "@/features/dataSets/skills/skillsDataSetSlice";
import { iconPickerSlice } from "@/components/iconPicker/iconPickerSlice";
import { abilityScoresSlice } from "@/features/characterSheet/abilityScores/abilityScoresSlice";
import { skillScoresSlice } from "@/features/characterSheet/skills/skillsSlice";
import { FeaturesDataSetSliceSlice } from "@/features/dataSets/features/featuresDataSetSlice";

export const store = configureStore({
  reducer: {
    basicInformation: basicInformationSlice.reducer,
    abilityScores: abilityScoresSlice.reducer,
    skillScores: skillScoresSlice.reducer,
    abilitiesDataSet: abilityDataSetSlice.reducer,
    proficiencyBonusDataSet: proficiencyBonusDataSetSlice.reducer,
    skillsDataSet: skillsDataSetSliceSlice.reducer,
    featuresDataSet: FeaturesDataSetSliceSlice.reducer,
    iconPicker: iconPickerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
