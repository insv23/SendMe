import { useState } from "react";
import { Editor } from "primereact/editor";

const InputEditor = ({ text, setText, onPaste, onSend }) => {
  const [key, setKey] = useState(0); // 添加一个用于重置组件的键

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      onSend();
      // FIXME: 使用组合键提交不会自动清空 text
      setKey((prevKey) => prevKey + 1);
    }
  };

  const header = (
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
    </span>
  );

  return (
    <div className="card">
      <Editor
        key={key} // 使用key强制重新渲染组件
        theme="bubble"
        value={text}
        placeholder="Input text or paste images here..."
        onTextChange={(e) => setText(e.htmlValue)}
        onPaste={onPaste}
        onKeyDown={handleKeyDown}
        style={{ minHeight: "150px" }}
        headerTemplate={header} // 隐藏工具栏
      />
    </div>
  );
};

export default InputEditor;
