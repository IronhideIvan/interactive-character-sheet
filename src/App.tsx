import { Route, Routes } from "react-router";
import BasicInformationSection from "./features/characterSheet/basicInformation/BasicInformationSection";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex justify="center">
      <Flex justify="stretch" width={{ base: "100%", lg: "50rem", xl: "60rem" }}>
        <Routes>
          <Route index element={<BasicInformationSection />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
