import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Ability } from "@/types/data/ability";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { deleteAbility, setAbilities, upsertAbility } from "./abilitiesDataSetSlice";
import { Icon } from "@/types/data/icon";
import { v4 as uuidv4 } from "uuid";

const AbilitiesDataSet = (): JSX.Element => {
  const { abilities } = useAppSelector(state => state.abilitiesDataSet);
  const dispatch = useAppDispatch();

  const handleGetId = (item: Ability) => {
    return item.id;
  };

  const handleStringValueChanged = (item: Ability, columnKey: keyof Ability, value: string) => {
    let newItem: Ability | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      case "abbreviation":
        newItem = { ...item, abbreviation: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertAbility(newItem));
    }
  };

  const handleIconValueChanged = (item: Ability, key: keyof Ability, value: Icon) => {
    if (key === "icon") {
      dispatch(upsertAbility({ ...item, icon: value }));
    }
  };

  const handleAddRow = () => {
    dispatch(setAbilities([
      ...abilities,
      {
        id: uuidv4(),
        name: "",
        abbreviation: "",
      },
    ]));
  };

  const handleDeleteRow = (item: Ability) => {
    dispatch(deleteAbility(item.id));
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={abilities}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: "text",
          },
          {
            name: "Abbreviation",
            key: "abbreviation",
            type: "text",
          },
          {
            name: "Icon",
            key: "icon",
            type: "icon",
          },
        ]}
        getId={handleGetId}
        onStringValueChange={handleStringValueChanged}
        onIconValueChange={handleIconValueChanged}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
      />
    </Box>
  );
};

export default AbilitiesDataSet;
