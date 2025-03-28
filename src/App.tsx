import { Route, Routes } from "react-router";
import BasicInformationSection from "./features/characterSheet/basicInformation/BasicInformationSection";
import { Flex } from "@chakra-ui/react";
import AbilitiesDataSet from "./features/dataSets/abilities/AbilitiesDataSet";

function App() {
  return (
    <Flex justify="center">
      <Flex justify="stretch" width={{ base: "100%", lg: "50rem", xl: "60rem" }}>
        <Routes>
          <Route index element={<BasicInformationSection />} />
          <Route path="data">
            <Route index element={<AbilitiesDataSet />} />
          </Route>
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
