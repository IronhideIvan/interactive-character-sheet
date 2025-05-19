import MDEditor from "@uiw/react-md-editor";
import { JSX } from "react";
import rehypeSanitize from "rehype-sanitize";

type MarkdownPreviewProps = {
  source: string;
};

const MarkdownPreview = ({ source }: MarkdownPreviewProps): JSX.Element => {
  return (
    <MDEditor.Markdown
      style={{ width: "100%" }}
      source={source}
      rehypePlugins={[rehypeSanitize]}
    />
  );
};

export default MarkdownPreview;
