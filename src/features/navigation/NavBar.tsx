import { useExport } from "@/hooks/useExport";
import { useImport } from "@/hooks/useImport";
import { Box, FileUpload, HStack, IconButton, Tabs } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { FaFolderOpen, FaRegSave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

const NavBar = (): JSX.Element => {
  const save = useExport();
  const load = useImport();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTab = useMemo(() => {
    if (location.pathname.toLowerCase().includes("/data")) {
      return "data";
    }
    if (location.pathname.toLowerCase().includes("/sandbox")) {
      return "sandbox";
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
      case "sandbox": {
        navigate("sandbox");
        break;
      }
      default: {
        navigate("/");
      }
    }
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
      <Tabs.Root value={selectedTab} onValueChange={det => handleValueChanged(det.value)} width="100%">
        <Tabs.List justifyContent={"center"}>
          <Tabs.Trigger value="char">Character Sheet</Tabs.Trigger>
          <Tabs.Trigger value="data">Data</Tabs.Trigger>
          <Tabs.Trigger value="sandbox">Sandbox</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};

export default NavBar;
