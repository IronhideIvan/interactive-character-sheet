import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { setHitDice } from "./../../basicInformationSlice";
import { v4 as uuidv4 } from "uuid";
import { HitDice } from "@/types/character/hitDice";
import cloneDeep from "lodash.clonedeep";
import { upsert } from "@/utils/arrayUtils";
import { EditorType } from "@/components/dataGrid/dataGridTypes";

const HitDiceEditor = (): JSX.Element => {
  const hitDice = useAppSelector(state => state.basicInformation.latest.hitDice);
  const initialHitDice = useAppSelector(state => state.basicInformation.initial.hitDice);
  const dispatch = useAppDispatch();

  const handleGetId = (item: HitDice) => {
    return item.id;
  };

  const upsertItem = (item: HitDice) => {
    dispatch(setHitDice(upsert(item, hitDice, hd => hd.id === item.id)));
  };

  const handleStringValueChanged = (item: HitDice, columnKey: keyof HitDice, value: string) => {
    let newItem: HitDice | undefined;
    switch (columnKey) {
      case "note":
        newItem = { ...item, note: value };
        break;
      default:
        break;
    }

    if (newItem) {
      upsertItem(newItem);
    }
  };

  const handleNumberValueChanged = (item: HitDice, columnKey: keyof HitDice, value: number) => {
    let newItem: HitDice | undefined;
    switch (columnKey) {
      case "hitDie":
        newItem = { ...item, hitDie: value };
        break;
      case "max":
        newItem = { ...item, max: value };
        break;
      case "numUsed":
        newItem = { ...item, numUsed: value };
        break;
      default:
        break;
    }

    if (newItem) {
      upsertItem(newItem);
    }
  };

  const handleAddRow = () => {
    dispatch(setHitDice([
      ...hitDice,
      {
        id: uuidv4(),
        note: "",
        hitDie: 0,
        max: 0,
        numUsed: 0,
      },
    ]));
  };

  const handleDeleteRow = (item: HitDice) => {
    dispatch(setHitDice(hitDice.filter(hd => hd.id !== item.id)));
  };

  const handleRevertAllChanges = () => {
    dispatch(setHitDice(cloneDeep(initialHitDice)));
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={hitDice}
        columnInfo={[
          {
            name: "Note",
            key: "note",
            type: EditorType.Text,
          },
          {
            name: "Hit Die",
            key: "hitDie",
            type: EditorType.Number,
          },
          {
            name: "Max",
            key: "max",
            type: EditorType.Number,
          },
          {
            name: "Used",
            key: "numUsed",
            type: EditorType.Number,
          },
        ]}
        getId={handleGetId}
        onStringValueChange={handleStringValueChanged}
        onNumberValueChange={handleNumberValueChanged}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onRevertAllChanges={handleRevertAllChanges}
      />
    </Box>
  );
};

export default HitDiceEditor;
