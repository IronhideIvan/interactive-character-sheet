import { Box, Flex } from "@chakra-ui/react";
import AppRoutes from "./features/navigation/AppRoutes";
import NavBar from "./features/navigation/NavBar";

function App() {
  return (
    <Box>
      <NavBar />
      <Flex justify="center" width={{ base: "100%", lg: "50rem", xl: "60rem" }}>
        <AppRoutes />
      </Flex>
    </Box>
  );
}

export default App;
