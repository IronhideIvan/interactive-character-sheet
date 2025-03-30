import DataGrid from "@/components/dataGrid/DataGrid";
import { CharacterClass } from "@/types/character/characterClass";
import { upsert } from "@/utils/arrayUtils";
import { JSX } from "react";
import { v4 as uuidv4 } from "uuid";

type EditClassesDataGridProps = {
  classes: CharacterClass[];
  onClassesChanged: (classes: CharacterClass[]) => void;
  onRevertChanges: () => void;
};

const EditClassesDataGrid = ({ classes, onClassesChanged, onRevertChanges }: EditClassesDataGridProps): JSX.Element => {
  const handleGetId = (item: CharacterClass) => {
    return item.id;
  };

  const handleStringValueChanged = (item: CharacterClass, columnKey: keyof CharacterClass, value: string) => {
    let newItem: CharacterClass | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      onClassesChanged(upsert(newItem, classes, item => item.id === newItem.id));
    }
  };

  const handleNumberValueChanged = (item: CharacterClass, columnKey: keyof CharacterClass, value: number) => {
    let newItem: CharacterClass | undefined;
    switch (columnKey) {
      case "level":
        newItem = { ...item, level: value };
        break;
      default:
        break;
    }

    if (newItem) {
      onClassesChanged(upsert(newItem, classes, item => item.id === newItem.id));
    }
  };

  const handleAddRow = () => {
    onClassesChanged([
      ...classes,
      {
        id: uuidv4(),
        name: "",
        level: 0,
      },
    ]);
  };

  const handleDeleteRow = (item: CharacterClass) => {
    onClassesChanged(classes.filter(c => c.id !== item.id));
  };

  const handleRevertAllChanges = () => {
    onRevertChanges();
  };

  return (
    <DataGrid
      items={classes}
      columnInfo={[
        {
          name: "Name",
          key: "name",
          type: "text",
        },
        {
          name: "Level",
          key: "level",
          type: "number",
        },
      ]}
      getId={handleGetId}
      onNumberValueChange={handleNumberValueChanged}
      onStringValueChange={handleStringValueChanged}
      onDeleteRow={handleDeleteRow}
      onRevertAllChanges={handleRevertAllChanges}
      onAddRow={handleAddRow}
    />
  );
};

export default EditClassesDataGrid;
