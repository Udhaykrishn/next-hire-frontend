"use client";

import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  Underline as UnderlineIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  className,
}: RichTextEditorProps) => {
  const lastInternalValue = React.useRef(value);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const cleanHtml = html === "<p></p>" ? "" : html;
      lastInternalValue.current = cleanHtml;
      onChange(cleanHtml);
    },
  });

  const [, setTick] = React.useState(0);

  useEffect(() => {
    if (!editor) return;
    const handler = () => setTick((t) => t + 1);
    editor.on("transaction", handler);
    return () => {
      editor.off("transaction", handler);
    };
  }, [editor]);

  useEffect(() => {
    if (!editor || !value) return;

    // Only update if the content is externally changed and we're not focused
    // We use lastInternalValue to check if the change came from the editor itself
    if (value !== lastInternalValue.current && !editor.isFocused) {
      editor.commands.setContent(value, { emitUpdate: false });
      lastInternalValue.current = value;
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "border border-gray-200 rounded-[24px] overflow-hidden focus-within:ring-2 focus-within:ring-wise-green/20 focus-within:border-wise-green transition-all bg-white shadow-sm",
        className,
      )}
    >
      <div className="bg-slate-50/50 border-b border-gray-100 px-4 py-2 flex items-center flex-wrap gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={!!editor.isActive("bold")}
          icon={<Bold className="w-4 h-4" />}
          tooltip="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={!!editor.isActive("italic")}
          icon={<Italic className="w-4 h-4" />}
          tooltip="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={!!editor.isActive("underline")}
          icon={<UnderlineIcon className="w-4 h-4" />}
          tooltip="Underline"
        />

        <div className="w-[1px] h-4 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={!!editor.isActive("bulletList")}
          icon={<List className="w-4 h-4" />}
          tooltip="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={!!editor.isActive("orderedList")}
          icon={<ListOrdered className="w-4 h-4" />}
          tooltip="Ordered List"
        />

        <div className="w-[1px] h-4 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={!!editor.isActive("heading", { level: 2 })}
          icon={<Heading2 className="w-4 h-4" />}
          tooltip="Heading 2"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={!!editor.isActive("heading", { level: 3 })}
          icon={<Heading3 className="w-4 h-4" />}
          tooltip="Heading 3"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={!!editor.isActive("blockquote")}
          icon={<Quote className="w-4 h-4" />}
          tooltip="Blockquote"
        />

        <div className="ml-auto">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-wise-green text-dark-green hover:bg-wise-green/90 transition-all shadow-sm shadow-wise-green/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Rewrite
          </button>
        </div>
      </div>

      <div className="p-2 bg-white">
        <EditorContent
          editor={editor}
          className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto prose prose-sm max-w-none focus:outline-none font-satoshi [&_*]:outline-none"
        />
      </div>
    </div>
  );
};

const ToolbarButton = ({
  onClick,
  active,
  icon,
  disabled,
  tooltip,
}: {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
  disabled?: boolean;
  tooltip: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()}
    disabled={disabled}
    className={cn(
      "p-2 rounded-xl transition-all duration-200 text-gray-600 hover:bg-slate-100 hover:text-near-black",
      disabled && "opacity-20 cursor-not-allowed",
    )}
    title={tooltip}
  >
    {icon}
  </button>
);

export default RichTextEditor;
