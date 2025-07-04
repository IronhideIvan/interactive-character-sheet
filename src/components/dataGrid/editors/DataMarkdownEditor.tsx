import { JSX, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Box, IconButton } from "@chakra-ui/react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import SimpleDialog from "@/components/dialog/SimpleDialog";
import { ActionButtonType } from "@/components/dialog/actionButtonTypes";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

type DataMarkdownEditorProps = {
  value: string;
  onValueChanged: (value: string) => void;
  readonly?: boolean;
};

const DataMarkdownEditor = ({ value, onValueChanged }: DataMarkdownEditorProps): JSX.Element => {
  const { isOpen, open, close } = useModal();
  const [isEditMode, setIsEditMode] = useState(value === "");
  const [editText, setEditText] = useState(value);

  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <IconButton onClick={open} variant={"ghost"}>
        <FaEye />
      </IconButton>
      {isOpen && (
        <SimpleDialog
          open={isOpen}
          onClose={close}
          actionButtonsType={isEditMode ? ActionButtonType.SaveCancel : ActionButtonType.Close}
          onSave={() => {
            onValueChanged(editText);
            setIsEditMode(false);
            setEditText("");
          }}
          onCancel={() => {
            setIsEditMode(false);
            setEditText("");
          }}
          topLeftActions={isEditMode
            ? undefined
            : (
              <IconButton
                variant={"ghost"}
                onClick={() => {
                  setEditText(value);
                  setIsEditMode(true);
                }}
              >
                <FaRegEdit />
              </IconButton>
            )}
        >
          {isEditMode
            ? (
              <MarkdownEditor value={editText} onChange={newValue => setEditText(newValue)} />
            )
            : (
              <Box width={"100%"} paddingX={6}>
                <MarkdownPreview source={value} />
              </Box>
            )}
        </SimpleDialog>
      )}
    </Box>
  );
};

export default DataMarkdownEditor;
