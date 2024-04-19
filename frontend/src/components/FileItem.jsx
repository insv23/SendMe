import React from 'react';

// React.memo是一个高阶组件，它仅对其组件的props变化时才会重新渲染。
const FileItem = React.memo(({ file, fileUrlBase = '' }) => {
  // 检查文件是否为图片
  const isImage = (file.type && file.type.startsWith("image/")) || ( file.file_type && file.file_type.startsWith("image/"));
  // 构建图片URL
  const imageUrl = isImage ? (fileUrlBase ? fileUrlBase + file.file_name : URL.createObjectURL(file)) : "/file.png";
  const fileName = file.file_name || file.name; // 兼容不同的文件名属性

  return (
    <div className="flex gap-2 m-1 file-item">
      <div className="flex-none">
        <img
          src={imageUrl}
          alt={fileName}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="flex items-center flex-auto overflow-hidden max-w-[120px]">
        <span className="truncate">{fileName}</span>
      </div>
    </div>
  );
});

export default FileItem;