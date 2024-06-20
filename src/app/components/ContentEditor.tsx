"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface ContentEditorProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

const ContentEditor = ({ value, onChange }: ContentEditorProps) => {
  return (
    <div className="container" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        height={500}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
};

export default ContentEditor;
