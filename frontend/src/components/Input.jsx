import { useState } from "react";

import InputEditor from "./InputEditor";
import InputFileArea from "./InputFileArea";
import InputToolbar from "./InputToolbar";
import messageService from "../services/message";

const Input = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const handleFilesSelect = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        setFiles([...files, file]);
        event.preventDefault();
      }
    }
  };

  const handleSend = async () => {
    // 直接将包含文本和文件的message对象作为请求体发送是不可行的，因为HTTP请求的body不能直接处理复杂的对象，
    // 如包含Blob或File对象的files数组。为了正确上传文件和其他数据，你需要使用FormData对象来构建请求体。
    const formData = new FormData();
    formData.append("text", text);
    // formData.append("files", files);
    // FormData.append方法需要分别对数组中的每个文件调用，以确保所有文件都被添加。
    files.forEach((file) => {
      formData.append("files", file);
    });
    const newMessage = await messageService.create(formData);
    if (newMessage) {
      // onMessageSend(newMessage);
      setText("");
      setFiles([]);
    }
  };

  return (
    <div className="input-container p-4 m-2 bg-[#202020] rounded-md border border-gray-600 hover:border-blue-500 focus-within:border-blue-500">
      <InputEditor
        text={text}
        setText={setText}
        onPaste={handlePaste}
        onSend={handleSend}
      />
      <InputFileArea files={files} onRemoveFile={handleRemoveFile} />
      <InputToolbar onFilesSelected={handleFilesSelect} onSend={handleSend} />
    </div>
  );
};

export default Input;
