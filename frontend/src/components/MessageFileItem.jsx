import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";
import FileItem from './FileItem'; 

const MessageFileItem = ({ file }) => {
  const fileUrlBase = `${import.meta.env.VITE_API_BASE_URL}/api/files/`;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // 检查文件是否为图片
  const isImage = file.file_type.startsWith("image/");

  const handleCopyClick = async () => {
    if (!isImage) {
      toast.error("只有图片可以被复制到剪贴板");
      return;
    }

    try {
      const imageResponse = await fetch(`${baseUrl}/api/files/${file.file_name}`);
      const imageBlob = await imageResponse.blob();
      // 将图片转换为image/png格式
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = await createImageBitmap(imageBlob);
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        if (window.ClipboardItem) {
          const clipboardItem = new ClipboardItem({"image/png": blob});
          await navigator.clipboard.write([clipboardItem]);
          toast.success("Image copied to clipboard");
        } else {
          console.error("ClipboardItem is not supported by this browser.");
          toast.error("此浏览器不支持复制到剪贴板(可能需要 https)"); 
        }
      }, 'image/png');
    } catch (err) {
      console.error("复制失败: ", err);
      toast.error("Failed to copy image");
    }
  };

  const handleDownloadClick = () => {
    // 创建一个a标签用于触发下载
    const link = document.createElement('a');
    link.href = `${baseUrl}/api/download/${file.file_name}`;
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
      <FileItem file={file} fileUrlBase={fileUrlBase} />
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
