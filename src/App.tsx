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
        overflow={"auto"}
      >
        <Flex
          justify="center"
          height={"100%"}
          width={"100%"}
          alignItems={"start"}
        >
          <AppRoutes />
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
