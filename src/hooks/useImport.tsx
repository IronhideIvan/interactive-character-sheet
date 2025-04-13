import { resetState as resetAbilityScoresState, setInitial as setInitialAbilityScores } from "@/features/characterSheet/abilityScores/abilityScoresSlice";
import { baseInformation, resetState as resetBasicInformationState, setInitial as setInitialBasicInformation } from "@/features/characterSheet/basicInformation/basicInformationSlice";
import { resetState as resetAbilitiesDataState, setInitial as setInitialAbilitiesData } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { resetState as resetProfBonusesState, setInitial as setInitialProfBonuses } from "@/features/dataSets/proficiencyBonuses/proficiencyBonusDataSetSlice";
import { resetState as resetSkillsState, setInitial as setInitialSkills } from "@/features/dataSets/skills/skillsDataSetSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { SaveFile } from "@/types/saveFile";
import saveAs from "file-saver";
import cloneDeep from "lodash.clonedeep";

export const useImport = () => {
  const dispatch = useAppDispatch();

  const importFile = (file: File) => {
    file.text().then((fileContents) => {
      const saveFile: SaveFile = JSON.parse(fileContents) as SaveFile;
      setInitialStates(dispatch, saveFile);

      dispatch(resetBasicInformationState());
      dispatch(resetAbilitiesDataState());
      dispatch(resetProfBonusesState());
      dispatch(resetSkillsState());
      dispatch(resetAbilityScoresState());
    });
  };

  return importFile;
};

export const useExport = () => {
  const dispatch = useAppDispatch();
  const basicInformation = useAppSelector(state => state.basicInformation.latest);
  const abilityScores = useAppSelector(state => state.abilityScores.latest);
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);
  const profBonuses = useAppSelector(state => state.proficiencyBonusDataSet.latest);
  const skills = useAppSelector(state => state.skillsDataSet.latest);

  const saveFile = () => {
    const fileContents: SaveFile = {
      character: {
        basicInformation: basicInformation,
        abilityScores: abilityScores,
      },
      data: {
        abilities: abilities,
        proficiencyBonuses: profBonuses,
        skills: skills,
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
};
