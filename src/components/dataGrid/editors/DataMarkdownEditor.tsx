import { JSX, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Box, IconButton } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editText, setEditText] = useState("");

  return (
    <Box>
      <IconButton onClick={open}>
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
        >
          {isEditMode
            ? (
              <MarkdownEditor value={editText} onChange={newValue => setEditText(newValue)} />
            )
            : (
              <MarkdownPreview source={value} />
            )}
        </SimpleDialog>
      )}
    </Box>
  );
};

export default DataMarkdownEditor;
