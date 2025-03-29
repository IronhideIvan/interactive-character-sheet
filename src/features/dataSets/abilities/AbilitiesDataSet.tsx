import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Ability } from "@/types/data/ability";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";
import { upsertAbility } from "./abilitiesDataSetSlice";

const AbilitiesDataSet = (): JSX.Element => {
  const { abilities } = useAppSelector(state => state.abilitiesDataSet);
  const dispatch = useAppDispatch();

  const handleGetId = (item: Ability) => {
    return item.id;
  };

  const handleGetValue = (item: Ability, columnKey: keyof Ability) => {
    switch (columnKey) {
      case "name":
        return item.name;
      case "abbreviation":
        return item.abbreviation;
      default:
        break;
    }
    return "Not Implemented";
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
        ]}
        getId={handleGetId}
        getDisplayValue={handleGetValue}
        onStringValueChange={handleStringValueChanged}
      />
    </Box>
  );
};

export default AbilitiesDataSet;
