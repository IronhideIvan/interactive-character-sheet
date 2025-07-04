import { useExport, useImport } from "@/hooks/useImport";
import { Box, FileUpload, HStack, IconButton, Tabs } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { FaFolderOpen, FaRegSave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { NavRoutes as NavRoutes } from "./navigation";
import { matchRoute, matchRouteValue } from "@/utils/navUtils";

const navRoutes: NavRoutes = {
  paths: [
    {
      path: "/journal",
      value: "journal",
      friendlyName: "Journal",
    },
    {
      path: "/data",
      value: "data",
      friendlyName: "Data",
    },
    {
      path: "/sandbox",
      value: "sandbox",
      friendlyName: "Sandbox",
    },
  ],
  fallback: {
    path: "/",
    value: "/",
    friendlyName: "Character Sheet",
  },
};

const NavBar = (): JSX.Element => {
  const save = useExport();
  const load = useImport();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRoute = useMemo(() => {
    return matchRoute(location.pathname, navRoutes);
  }, [location.pathname]);

  const handleValueChanged = (val: string) => {
    const navItem = matchRouteValue(val, navRoutes);
    navigate(navItem.value);
  };

  const handleFilePicked = (files: File[]) => {
    if (files.length > 0) {
      load(files[0]);
    }
  };

  return (
    <Box position={"relative"}>
      <HStack
        position={"absolute"}
        right={"16px"}
        zIndex={1}
      >
        <IconButton variant={"outline"} aria-label="export data" onClick={save}>
          <FaRegSave />
        </IconButton>
        <FileUpload.Root
          accept={["application/json"]}
          onFileAccept={(e) => {
            handleFilePicked(e.files);
          }}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <IconButton variant={"outline"} aria-label="import data">
              <FaFolderOpen />
            </IconButton>
          </FileUpload.Trigger>
        </FileUpload.Root>

      </HStack>
      <Tabs.Root value={selectedRoute.value} onValueChange={det => handleValueChanged(det.value)} width="100%">
        <Tabs.List justifyContent={"center"}>
          <Tabs.Trigger
            key={navRoutes.fallback.value}
            value={navRoutes.fallback.value}
          >{navRoutes.fallback.friendlyName}
          </Tabs.Trigger>
          {navRoutes.paths.map((p) => {
            return (
              <Tabs.Trigger key={p.value} value={p.value}>{p.friendlyName}</Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};

export default NavBar;
