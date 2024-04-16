import { Button } from "primereact/button";

const InputFileItem = ({ file, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(file);
  };

  // 检查文件是否为图片
  const isImage = file.type.startsWith("image/");

  return (
    <div className="flex gap-2 m-1 file-item">
      <div className="flex-none">
        <img
          src={isImage ? URL.createObjectURL(file) : "/file.png"}
          alt={file.name}
          style={{
            width: "50px", // 设置固定宽度
            height: "50px", // 设置固定高度
            objectFit: "cover", // 保持宽高比同时填充整个容器
            objectPosition: "center", // 图片居中
          }}
        />
      </div>
      <div className="flex items-center flex-auto overflow-hidden">
        <span className="truncate">{file.name}</span>
      </div>
      <div className="flex-none">
        <Button icon="pi pi-trash " text onClick={handleRemoveClick}></Button>
      </div>
    </div>
  );
};

export default InputFileItem;
