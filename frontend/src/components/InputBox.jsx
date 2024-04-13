import { useState } from "react";
import messageService from "../services/message";

const InputBox = ({ onMessageSend }) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [pastedImageURLs, setPastedImageURLs] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePaste = async (event) => {
    //FIXME Only handle image pasting(fornow), text uses default response
    const clipboardItems = (
      event.clipboardData || event.originalEvent.clipboardData
    ).items;

    for (const item of clipboardItems) {
      if (item.type.indexOf("image") !== -1) {
        const blob = item.getAsFile();
        setFiles((files) => [...files, blob]);
        const imageUrl = URL.createObjectURL(blob);
        setPastedImageURLs((pastedImages) => [...pastedImages, imageUrl]);
        break;
      }
    }
  };

  const handleUpload = async () => {
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
      onMessageSend(newMessage);
      setText("");
      setFiles([]);
      setPastedImageURLs([]);
    }
  };

  const handleKeyDown = (event) => {
    // 对于Mac，event.metaKey是Cmd键；对于Windows/Linux，event.ctrlKey是Ctrl键
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      console.log('🔥[ event ] >', event);
      handleUpload();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown} 
          placeholder="Type your message or paste a image here..."
        />
        <button onClick={handleUpload} disabled={!text && files.length === 0}>Send</button>

        <div>
          {pastedImageURLs.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Pasted Image ${index}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputBox;
