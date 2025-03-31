import DynamicIcon from "@/components/DynamicIcon";
import { Icon } from "@/types/data/icon";
import { Button } from "@chakra-ui/react";
import { JSX } from "react";

type DataColorEditorProps = {
  icon?: Icon;
  onClick: () => void;
};

const DataColorEditor = ({ icon, onClick }: DataColorEditorProps): JSX.Element => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      width={"100%"}
      minWidth={"3rem"}
      maxHeight={"2rem"}
    >
      {icon && (
        <DynamicIcon iconId={icon.id} color={icon.color} />
      )}
    </Button>
  );
};

export default DataColorEditor;
