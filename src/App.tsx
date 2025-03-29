import { Box, Flex } from "@chakra-ui/react";
import AppRoutes from "./features/navigation/AppRoutes";
import NavBar from "./features/navigation/NavBar";

function App() {
  return (
    <Box width={"100%"} height={"100vh"} overflow={"hidden"}>
      <NavBar />
      <Flex
        width={"100%"}
        justifyContent={"center"}
        alignItems={"start"}
        height={"100%"}
        overflow={"hidden"}
      >
        <Flex
          justify="center"
          height={"100%"}
          overflow={"hidden"}
          alignItems={"start"}
          width={{ base: "100%", lg: "50rem", xl: "60rem" }}
        >
          <AppRoutes />
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
