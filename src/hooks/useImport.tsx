import { resetState as resetBasicInformationState, setInitial as setInitialBasicInformation } from "@/features/characterSheet/basicInformation/basicInformationSlice";
import { resetState as resetAbilitiesDataState, setInitial as setInitialAbilitiesData } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { resetState as resetProfBonusesState, setInitial as setInitialProfBonuses } from "@/features/dataSets/proficiencyBonuses/proficiencyBonusDataSetSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SaveFile } from "@/types/saveFile";

export const useImport = () => {
  const dispatch = useAppDispatch();

  const importFile = (file: File) => {
    file.text().then((fileContents) => {
      const saveFile: SaveFile = JSON.parse(fileContents) as SaveFile;

      if (saveFile?.character?.basicInformation) {
        dispatch(setInitialBasicInformation(saveFile.character.basicInformation));
      }
      dispatch(resetBasicInformationState());

      if (saveFile?.data?.abilities) {
        dispatch(setInitialAbilitiesData(saveFile.data.abilities));
      }
      dispatch(resetAbilitiesDataState());

      if (saveFile?.data?.proficiencyBonuses) {
        dispatch(setInitialProfBonuses(saveFile.data.proficiencyBonuses));
      }
      dispatch(resetProfBonusesState());
    });
  };

  return importFile;
};
