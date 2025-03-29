import { useAppSelector } from "@/redux/hooks";
import { SaveFile } from "@/types/saveFile";
import { saveAs } from "file-saver";

export const useExport = () => {
  const basicInformation = useAppSelector(state => state.basicInformation.latest);
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);

  const saveFile = () => {
    const fileContents: SaveFile = {
      character: {
        basicInformation: basicInformation,
      },
      data: {
        abilities: abilities,
      },
    };

    const file = new Blob([JSON.stringify(fileContents)], { type: "application/json" });
    saveAs(file, "character-sheet-export.json");
  };

  return saveFile;
};
