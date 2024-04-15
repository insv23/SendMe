import File from "./File";

const InputFileArea = ({ files, onRemoveFile }) => {
  return (
    <div className="flex-col m-2">
      {files.map((file, index) => (
        // 为每个文件渲染一个File组件
        <File key={index} file={file} onRemove={onRemoveFile} />
      ))}
    </div>
  );
};

export default InputFileArea;
