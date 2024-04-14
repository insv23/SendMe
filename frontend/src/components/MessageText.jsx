import React from "react";
import { Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const notify = () => toast.success("Text copied to clipboard");

const MessageText = ({ text }) => {
  // 复制文本到剪贴板的函数
  const copyToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      notify();
    } else {
      // 备用方法，适用于不支持 Clipboard API 的浏览器
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      notify();
    }
  };

  return (
    <div className="relative py-1">
      <Toaster position="top-center" reverseOrder={false} />
      {text && (
        <>
          <p className="text-[#C8C8C8] inline-block">{text}</p>
          <Tippy content="Copy text">
            <button
              onClick={() => copyToClipboard(text)}
              className="absolute right-0 text-gray-400 top-2 hover:text-gray-600"
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
