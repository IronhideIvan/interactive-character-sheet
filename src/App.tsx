import { Flex } from "@chakra-ui/react";
import AppRoutes from "./features/navigation/AppRoutes";

function App() {
  return (
    <Flex justify="center">
      <Flex justify="stretch" width={{ base: "100%", lg: "50rem", xl: "60rem" }}>
        <AppRoutes />
      </Flex>
    </Flex>
  );
}

export default App;
