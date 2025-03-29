import { Box, Tabs } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

const NavBar = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTab = useMemo(() => {
    if (location.pathname.toLowerCase().includes("/data")) {
      return "data";
    }
    else {
      return "char";
    }
  }, [location.pathname]);

  const handleValueChanged = (val: string) => {
    switch (val) {
      case "data": {
        navigate("data");
        break;
      }
      default: {
        navigate("/");
      }
    }
  };

  return (
    <Box>
      <Tabs.Root value={selectedTab} onValueChange={det => handleValueChanged(det.value)} width="100%">
        <Tabs.List justifyContent={"center"}>
          <Tabs.Trigger value="char">Character Sheet</Tabs.Trigger>
          <Tabs.Trigger value="data">Data</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};

export default NavBar;
