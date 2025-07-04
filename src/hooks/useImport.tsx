import { resetState as resetAbilityScoresState, setInitial as setInitialAbilityScores } from "@/features/characterSheet/abilityScores/abilityScoresSlice";
import { baseInformation, resetState as resetBasicInformationState, setInitial as setInitialBasicInformation } from "@/features/characterSheet/basicInformation/basicInformationSlice";
import { resetState as resetCharacterFeaturesState, setInitial as setInitialCharacterFeatures } from "@/features/characterSheet/features/characterFeature/characterFeaturesSlice";
import { resetState as resetFeatureGroups, setInitial as setInitialFeatureGroups } from "@/features/characterSheet/features/FeatureGroup/featureGroupsSlice";
import { resetState as resetCollectionGroupsState, setInitial as setInitialGroupCollections } from "@/features/dataSets/collections/groupCollectionsSlice";
import { resetState as resetSkillScoresState, setInitial as setInitialSkillScores } from "@/features/characterSheet/skills/skillsSlice";
import { resetState as resetAbilitiesDataState, setInitial as setInitialAbilitiesData } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { resetState as resetFeaturesState, setInitial as setInitialFeatures } from "@/features/dataSets/features/featuresDataSetSlice";
import { resetState as resetProfBonusesState, setInitial as setInitialProfBonuses } from "@/features/dataSets/proficiencyBonuses/proficiencyBonusDataSetSlice";
import { resetState as resetSkillsState, setInitial as setInitialSkills } from "@/features/dataSets/skills/skillsDataSetSlice";
import { resetState as resetCustomNotesState, setInitial as setInitialNotes } from "@/features/general/notes/customNotesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { SaveFile } from "@/types/saveFile";
import saveAs from "file-saver";
import cloneDeep from "lodash.clonedeep";
import { resetState as resetCustomGridsState, setInitial as setInitialGrids } from "@/features/general/grids/customGridsSlice";
import { resetState as resetJournalEntriesState, setInitial as setInitialJournalEntries } from "@/features/journal/journalEntriesSlice";

export const useImport = () => {
  const dispatch = useAppDispatch();

  const importFile = (file: File) => {
    file.text().then((fileContents) => {
      const saveFile: SaveFile = JSON.parse(fileContents) as SaveFile;
      setInitialStates(dispatch, saveFile);

      dispatch(resetBasicInformationState());
      dispatch(resetAbilitiesDataState());
      dispatch(resetAbilityScoresState());
      dispatch(resetSkillScoresState());
      dispatch(resetCharacterFeaturesState());
      dispatch(resetFeatureGroups());

      dispatch(resetProfBonusesState());
      dispatch(resetSkillsState());
      dispatch(resetFeaturesState());
      dispatch(resetCollectionGroupsState());

      dispatch(resetCustomNotesState());
      dispatch(resetCustomGridsState());

      dispatch(resetJournalEntriesState());
    });
  };

  return importFile;
};

export const useExport = () => {
  const dispatch = useAppDispatch();
  const basicInformation = useAppSelector(state => state.basicInformation.latest);
  const abilityScores = useAppSelector(state => state.abilityScores.latest);
  const skillScores = useAppSelector(state => state.skillScores.latest);
  const characterFeatures = useAppSelector(state => state.characterFeatures.latest);
  const featureGroups = useAppSelector(state => state.featureGroups.latest);
  const groupCollections = useAppSelector(state => state.groupCollections.latest);

  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);
  const profBonuses = useAppSelector(state => state.proficiencyBonusDataSet.latest);
  const skills = useAppSelector(state => state.skillsDataSet.latest);
  const features = useAppSelector(state => state.featuresDataSet.latest);

  const customNotes = useAppSelector(state => state.customNotes.latest);
  const customGrids = useAppSelector(state => state.customGrids.latest);

  const journalEntries = useAppSelector(state => state.journalEntries.latest);

  const saveFile = () => {
    const fileContents: SaveFile = {
      character: {
        basicInformation: basicInformation,
        abilityScores: abilityScores,
        skills: skillScores,
        features: characterFeatures,
        featureGroups: featureGroups,
      },
      data: {
        abilities: abilities,
        proficiencyBonuses: profBonuses,
        skills: skills,
        features: features,
        groupCollections: groupCollections,
      },
      general: {
        customNotes: customNotes,
        customGrids: customGrids,
      },
      journalEntries: journalEntries,
      version: {
        major: 0,
        minor: 1,
        patch: 0,
      },
    };

    const file = new Blob([JSON.stringify(fileContents)], { type: "application/json" });
    saveAs(file, "character-sheet-export.json");
    setInitialStates(dispatch, fileContents);
  };

  return saveFile;
};

const setInitialStates = (dispatch: typeof store.dispatch, saveFile: SaveFile) => {
  if (saveFile?.data?.abilities) {
    dispatch(setInitialAbilitiesData(saveFile.data.abilities));
  }

  if (saveFile?.data?.proficiencyBonuses) {
    dispatch(setInitialProfBonuses(saveFile.data.proficiencyBonuses));
  }

  if (saveFile?.data?.skills) {
    dispatch(setInitialSkills(saveFile.data.skills));
  }

  if (saveFile?.data?.features) {
    dispatch(setInitialFeatures(saveFile.data.features));
  }

  if (saveFile?.data?.groupCollections) {
    dispatch(setInitialGroupCollections(saveFile.data.groupCollections));
  }

  if (saveFile?.character?.basicInformation) {
    const bi = saveFile.character.basicInformation;
    if (!bi.classes) {
      bi.classes = cloneDeep(baseInformation.classes);
    }
    if (!bi.hitPoints) {
      bi.hitPoints = cloneDeep(baseInformation.hitPoints);
    }
    if (!bi.hitDice) {
      bi.hitDice = cloneDeep(baseInformation.hitDice);
    }
    dispatch(setInitialBasicInformation(saveFile.character.basicInformation));
  }

  if (saveFile?.character?.abilityScores) {
    dispatch(setInitialAbilityScores(saveFile.character.abilityScores));
  }

  if (saveFile?.character?.skills) {
    dispatch(setInitialSkillScores(saveFile.character.skills));
  }

  if (saveFile?.character?.features) {
    dispatch(setInitialCharacterFeatures(saveFile.character.features));
  }

  if (saveFile?.character?.featureGroups) {
    dispatch(setInitialFeatureGroups(saveFile.character.featureGroups));
  }

  if (saveFile?.general?.customNotes) {
    dispatch(setInitialNotes(saveFile.general.customNotes));
  }

  if (saveFile?.general?.customGrids) {
    dispatch(setInitialGrids(saveFile.general.customGrids));
  }

  if (saveFile?.journalEntries) {
    dispatch(setInitialJournalEntries(saveFile.journalEntries));
  }
};
