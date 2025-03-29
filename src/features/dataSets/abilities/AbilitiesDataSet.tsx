import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppSelector } from "@/redux/hooks";
import { Ability } from "@/types/data/ability";
import { Box } from "@chakra-ui/react";
import { JSX } from "react";

const AbilitiesDataSet = (): JSX.Element => {
  const { abilities } = useAppSelector(state => state.abilitiesDataSet);

  const handleGetId = (item: Ability) => {
    return item.id;
  };

  const handleGetValue = (item: Ability, columnKey: keyof Ability) => {
    switch (columnKey) {
      case "name":
        return item.name;
      default:
        break;
    }
    return item.id;
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={abilities}
        columnInfo={[
          {
            name: "Name",
            key: "name",
          },
        ]}
        getId={handleGetId}
        getValue={handleGetValue}
      />
    </Box>
  );
};

export default AbilitiesDataSet;
