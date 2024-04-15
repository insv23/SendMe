import { Editor } from "primereact/editor";

const InputEditor = ({ text, setText }) => {
  return (
    <div className="card">
      <Editor
        theme="bubble"
        value={text}
        placeholder="Input text or paste images here..."
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: "150px" }}
      />
    </div>
  );
};

export default InputEditor;
