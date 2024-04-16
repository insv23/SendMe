import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";

const MessageFileItem = ({ file }) => {
  const fileUrlBase = `${import.meta.env.VITE_API_BASE_URL}/api/files/`;

  // 检查文件是否为图片
  const isImage = file.file_type.startsWith("image/");

  const handleCopyClick = async () => {
    if (!isImage) {
      toast.error("只有图片可以被复制到剪贴板");
      return;
    }

    try {
      const imageResponse = await fetch(fileUrlBase + file.file_name);
      const imageBlob = await imageResponse.blob();
      const clipboardItem = new ClipboardItem({ "image/png": imageBlob });
      await navigator.clipboard.write([clipboardItem]);
      toast.success("Image copied to clipboard");
    } catch (err) {
      console.error("复制失败: ", err);
      toast.error("复制到剪贴板失败");
    }
  };

  const handleDownloadClick = () => {
    // 创建一个a标签用于触发下载
    const link = document.createElement('a');
    link.href = fileUrlBase + file.file_name;
    link.download = file.file_name; // 设置下载的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // 显示下载开始的 toast 消息
    toast.success("Download started");
  };

  return (
    <div className="flex gap-2 m-1 message-file-item">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-none">
        <img
          src={isImage ? fileUrlBase + file.file_name : "/file.png"}
          alt={file.file_name}
          style={{
            width: "50px", // 设置固定宽度
            height: "50px", // 设置固定高度
            objectFit: "cover", // 保持宽高比同时填充整个容器
            objectPosition: "center", // 图片居中
          }}
        />
      </div>
      <div className="flex items-center flex-auto overflow-hidden">
        <span className="truncate">{file.file_name}</span>
      </div>
      <div
        className="flex-none"
        style={{ display: isImage ? "block" : "none" }}
      >
        <Button icon="pi pi-copy" text onClick={handleCopyClick}></Button>
      </div>
      <div className="flex-none">
        <Button
          icon="pi pi-arrow-circle-down"
          text
          onClick={handleDownloadClick}
        ></Button>
      </div>
    </div>
  );
};

export default MessageFileItem;
