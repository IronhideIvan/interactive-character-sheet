import { useAppSelector } from "@/redux/hooks";
import { SaveFile } from "@/types/saveFile";
import { saveAs } from "file-saver";

export const useExport = () => {
  const basicInformation = useAppSelector(state => state.basicInformation.latest);
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);
  const profBonuses = useAppSelector(state => state.proficiencyBonusDataSet.latest);
  const skills = useAppSelector(state => state.skillsDataSet.latest);

  const saveFile = () => {
    const fileContents: SaveFile = {
      character: {
        basicInformation: basicInformation,
      },
      data: {
        abilities: abilities,
        proficiencyBonuses: profBonuses,
        skills: skills,
      },
    };

    const file = new Blob([JSON.stringify(fileContents)], { type: "application/json" });
    saveAs(file, "character-sheet-export.json");
  };

  return saveFile;
};
