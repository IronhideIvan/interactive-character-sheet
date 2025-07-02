import { configureStore } from "@reduxjs/toolkit";
import { basicInformationSlice } from "../features/characterSheet/basicInformation/basicInformationSlice";
import { abilityDataSetSlice } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { proficiencyBonusDataSetSlice } from "@/features/dataSets/proficiencyBonuses/proficiencyBonusDataSetSlice";
import { skillsDataSetSliceSlice } from "@/features/dataSets/skills/skillsDataSetSlice";
import { iconPickerSlice } from "@/components/iconPicker/iconPickerSlice";
import { abilityScoresSlice } from "@/features/characterSheet/abilityScores/abilityScoresSlice";
import { skillScoresSlice } from "@/features/characterSheet/skills/skillsSlice";
import { featuresDataSetSliceSlice } from "@/features/dataSets/features/featuresDataSetSlice";
import { characterFeaturesSlice } from "@/features/characterSheet/features/characterFeature/characterFeaturesSlice";
import { customNotesSlice } from "@/features/general/notes/customNotesSlice";
import { featureGroupsSlice } from "@/features/characterSheet/features/FeatureGroup/featureGroupsSlice";
import { groupCollectionsSlice } from "@/features/dataSets/collections/groupCollectionsSlice";
import { customGridsSlice } from "@/features/general/grids/customGridsSlice";

export const store = configureStore({
  reducer: {
    abilitiesDataSet: abilityDataSetSlice.reducer,
    abilityScores: abilityScoresSlice.reducer,
    basicInformation: basicInformationSlice.reducer,
    characterFeatures: characterFeaturesSlice.reducer,
    customGrids: customGridsSlice.reducer,
    customNotes: customNotesSlice.reducer,
    featuresDataSet: featuresDataSetSliceSlice.reducer,
    featureGroups: featureGroupsSlice.reducer,
    groupCollections: groupCollectionsSlice.reducer,
    iconPicker: iconPickerSlice.reducer,
    proficiencyBonusDataSet: proficiencyBonusDataSetSlice.reducer,
    skillScores: skillScoresSlice.reducer,
    skillsDataSet: skillsDataSetSliceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
