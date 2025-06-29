import { Box, createListCollection, Portal, Select, VStack } from "@chakra-ui/react";
import { JSX, ReactNode, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavRoutes } from "../navigation/navigation";
import { matchRoute, matchRouteValue } from "@/utils/navUtils";

const navRoutes: NavRoutes = {
  paths: [
    {
      path: "/abilities",
      value: "/data/abilities",
      friendlyName: "Abilities",
    },
    {
      path: "/collections",
      value: "/data/collections",
      friendlyName: "Collections",
    },
    {
      path: "/features",
      value: "/data/features",
      friendlyName: "Features",
    },
    {
      path: "/prof",
      value: "/data/prof",
      friendlyName: "Proficiency Bonus",
    },
    {
      path: "/skills",
      value: "/data/skills",
      friendlyName: "Skills",
    },
  ].sort((a, b) => a.friendlyName.localeCompare(b.friendlyName)),
  fallback: {
    path: "/abilities",
    value: "/data/abilities",
    friendlyName: "Abilities",
  },
};

const selectCollection = createListCollection({
  items: navRoutes.paths.map((p) => {
    return {
      label: p.friendlyName,
      value: p.value,
    };
  }),
});

const DataSets = ({ children }: {
  children: ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRoute = useMemo(() => {
    return matchRoute(location.pathname, navRoutes);
  }, [location.pathname]);

  const handleValueChanged = (val: string[]) => {
    if (val.length === 0) {
      return;
    }

    const navItem = matchRouteValue(val[0], navRoutes);
    navigate(navItem.value);
  };

  return (
    <VStack
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      <Box>
        <Select.Root
          collection={selectCollection}
          width="320px"
          value={[selectedRoute.value]}
          onValueChange={e => handleValueChanged(e.value)}
        >
          <Select.HiddenSelect />
          <Select.Label>Select data set</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select data set" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {selectCollection.items.map(p => (
                  <Select.Item item={p} key={p.value}>
                    {p.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
        overflow={"auto"}
        alignItems={"start"}
        paddingTop={2}
      >
        {children}
      </Box>
    </VStack>
  );
};

export default DataSets;
