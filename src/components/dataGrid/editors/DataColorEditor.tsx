import DynamicIcon from "@/components/icons/DynamicIcon";
import { Icon } from "@/types/data/icon";
import { Button } from "@chakra-ui/react";
import { JSX } from "react";

type DataColorEditorProps = {
  icon?: Icon;
  onClick: () => void;
};

const DataColorEditor = ({ icon, onClick }: DataColorEditorProps): JSX.Element => {
  return (
    <Button onClick={onClick} variant={"ghost"} maxHeight={"2rem"}>
      {icon && (
        <DynamicIcon iconId={icon.id} color={icon.color} />
      )}
    </Button>
  );
};

export default DataColorEditor;
