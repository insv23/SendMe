import React, { useRef } from "react";
import { Editor } from "primereact/editor";
import { Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const notify = () => toast.success("Text copied to clipboard");

const MessageText = ({ text }) => {
  const editorRef = useRef(null);

  // 复制文本到剪贴板的函数
  const copyToClipboard = async (text) => {
    // 选中文本
    const editor = editorRef.current.getQuill(); // 获取Quill实例
    const length = editor.getLength(); // 获取文本长度
    editor.setSelection(0, length); // 选中所有文本

    // 尝试使用Clipboard API复制文本
    if (navigator.clipboard) {
      const text = editor.getText(); // 获取编辑器中的纯文本
      try {
        await navigator.clipboard.writeText(text);
        notify(); // 显示成功通知
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      // 备用方法，适用于不支持 Clipboard API 的浏览器
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = editor.getText(); // 获取编辑器中的纯文本
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      notify(); // 显示成功通知
    }

    // 复制完成后取消选中
    editor.setSelection(null);
  };

  return (
    <div className="relative py-1">
      <Toaster position="top-center" reverseOrder={false} />
      {text && (
        <>
          <Editor ref={editorRef} value={text} readOnly theme="bubble" />
          <Tippy content="Copy text">
            <button
              onClick={() => copyToClipboard(text)}
              className="absolute right-0 text-gray-400 top-4 hover:text-gray-600"
            >
              <Copy size={16} />
            </button>
          </Tippy>
        </>
      )}
    </div>
  );
};

export default MessageText;
