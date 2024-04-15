import { Editor } from "primereact/editor";

const InputEditor = ({ text, setText, onPaste, onSend }) => {
  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      onSend();
    }
  };
  return (
    <div className="card">
      <Editor
        theme="bubble"
        value={text}
        placeholder="Input text or paste images here..."
        onTextChange={(e) => setText(e.htmlValue)}
        onPaste={onPaste}
        onKeyDown={handleKeyDown}
        style={{ height: "150px" }}
      />
    </div>
  );
};

export default InputEditor;
