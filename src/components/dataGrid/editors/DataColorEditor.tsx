import { Icon } from "@/types/data/icon";
import { Button } from "@chakra-ui/react";
import { JSX } from "react";

type DataColorEditorProps = {
  icon?: Icon;
  onClick: () => void;
};

const DataColorEditor = ({ icon, onClick }: DataColorEditorProps): JSX.Element => {
  return (
    <Button onClick={onClick}>{icon?.id} {icon?.color}
    </Button>
  );
};

export default DataColorEditor;
