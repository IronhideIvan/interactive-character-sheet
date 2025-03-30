import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ProficiencyBonus } from "@/types/data/proficienyBonus";
import { JSX } from "react";
import { deleteBonus, resetState, setBonuses, upsertBonus } from "./proficiencyBonusDataSetSlice";
import { v4 as uuidv4 } from "uuid";

const ProficiencyBonusDataSet = (): JSX.Element => {
  const profs = useAppSelector(state => state.proficiencyBonusDataSet.latest);
  const dispatch = useAppDispatch();

  const handleGetId = (item: ProficiencyBonus) => {
    return item.id;
  };

  const handleNumberValueChanged = (item: ProficiencyBonus, columnKey: keyof ProficiencyBonus, value: number) => {
    let newItem: ProficiencyBonus | undefined;
    switch (columnKey) {
      case "level":
        newItem = { ...item, level: value };
        break;
      case "bonus":
        newItem = { ...item, bonus: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertBonus(newItem));
    }
  };

  const handleAddRow = () => {
    dispatch(setBonuses([
      ...profs,
      {
        id: uuidv4(),
        level: 0,
        bonus: 0,
      },
    ]));
  };

  const handleDeleteRow = (item: ProficiencyBonus) => {
    dispatch(deleteBonus(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetState());
  };

  return (
    <DataGrid
      items={profs}
      columnInfo={[
        {
          name: "Level",
          key: "level",
          type: "number",
        },
        {
          name: "Bonus",
          key: "bonus",
          type: "number",
        },
      ]}
      getId={handleGetId}
      onNumberValueChange={handleNumberValueChanged}
      onAddRow={handleAddRow}
      onDeleteRow={handleDeleteRow}
      onRevertAllChanges={handleRevertAllChanges}
    />
  );
};

export default ProficiencyBonusDataSet;
