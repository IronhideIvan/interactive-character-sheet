import MDEditor from "@uiw/react-md-editor";
import { JSX } from "react";
import rehypeSanitize from "rehype-sanitize";

type MarkdownEditorProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps): JSX.Element => {
  return (
    <MDEditor
      style={{ width: "100%" }}
      value={value}
      onChange={(newValue) => {
        onChange(newValue ?? "");
      }}
      previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
      height={"100%"}
      visibleDragbar={false}
      minHeight={300}
    />
  );
};

export default MarkdownEditor;
