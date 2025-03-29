import { resetState as resetBasicInformationState, setInitial as setInitialBasicInformation } from "@/features/characterSheet/basicInformation/basicInformationSlice";
import { resetState as resetAbilitiesDataState, setInitial as setInitialAbilitiesData } from "@/features/dataSets/abilities/abilitiesDataSetSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SaveFile } from "@/types/saveFile";

export const useImport = () => {
  const dispatch = useAppDispatch();

  const importFile = (file: File) => {
    file.text().then((fileContents) => {
      const saveFile: SaveFile = JSON.parse(fileContents) as SaveFile;

      dispatch(setInitialBasicInformation(saveFile.character.basicInformation));
      dispatch(resetBasicInformationState());

      dispatch(setInitialAbilitiesData(saveFile.data.abilities));
      dispatch(resetAbilitiesDataState());
    });
  };

  return importFile;
};
