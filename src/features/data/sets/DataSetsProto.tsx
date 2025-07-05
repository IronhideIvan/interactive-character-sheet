import { SectionTitle } from "@/components/SectionTitle";
import DataSetField from "@/features/general/datsets/DataSetField";
import DataSetHeaderManager from "@/features/general/datsets/DataSetHeaderManager";
import { useAppSelector } from "@/redux/hooks";
import { VStack } from "@chakra-ui/react";
import { JSX } from "react";
import DataObjects from "../objects/DataObjects";

const myTestId = "133ad064-216c-4a14-a6eb-7cb7d2765347";

const DataSetsProto = (): JSX.Element => {
  const dataSets = useAppSelector(state => state.dataSets.latest);
  let myDataSet = dataSets.find(ds => ds.id === myTestId);
  if (!myDataSet) {
    myDataSet = {
      id: myTestId,
      name: "Test Data Set",
      headers: [],
      rows: [],
      cells: {},
    };
  }

  return (
    <VStack width={"100%"} display={"flex"} justifyContent={"center"}>
      <SectionTitle label="Data Objects" />
      <DataObjects />
      <SectionTitle label="Data Set Headers" />
      <DataSetHeaderManager dataset={myDataSet} />
      <SectionTitle label="Data Set Fields" />
      <DataSetField dataset={myDataSet} />
    </VStack>
  );
};

export default DataSetsProto;
