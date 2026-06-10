"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

interface RichTextViewerProps {
  content: string;
  className?: string;
}

export function RichTextViewer({ content, className }: RichTextViewerProps) {
  const editor = useEditor({
    editable: false,
    content,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
    ],
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "prose prose-sm max-w-none font-satoshi [&_*]:outline-none",
        className,
      )}
    />
  );
}
