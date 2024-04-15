import { useState } from "react";

import InputEditor from "./InputEditor";
import InputFileArea from "./InputFileArea";
import InputToolbar from "./InputToolbar";

const Input = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const handleFilesSelect = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  return (
    <div className="input-container p-4 m-2 bg-[#202020] rounded-md border border-gray-600 hover:border-blue-500 focus-within:border-blue-500">
      <InputEditor text={text} setText={setText} />
      <InputFileArea files={files} onRemoveFile={handleRemoveFile} />
      <InputToolbar onFilesSelected={handleFilesSelect} />
    </div>
  );
};

export default Input;
