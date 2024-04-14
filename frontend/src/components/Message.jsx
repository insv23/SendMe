import FormattedDateTime from './FormattedDateTime';
import MessageText from './MessageText';

const Message = ({ message }) => {
  const fileUrlBase = "http://localhost:9003/api/files/";

  return (
    <div className="p-4 m-2 bg-[#202020] rounded-md">
      <FormattedDateTime dateTime={message.message_creation_time} />
      <MessageText text={message.message_text} />
      {message.message_files.map((file) => {
        // 根据文件类型决定如何展示文件
        let fileElement;
        if (file.file_type.startsWith("image/")) {
          // 如果是图片, 直接展示图片
          fileElement = (
            <img
              src={`${fileUrlBase}${file.file_name}`}
              alt={file.file_name}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          );
        } else {
          // 对于其他类型的文件，提供一个下载链接
          fileElement = (
            <a href={`${fileUrlBase}${file.file_name}`} download>
              {file.file_name}
            </a>
          );
        }
        return <div key={file.file_id}>{fileElement}</div>;
      })}
    </div>
  );
};

export default Message;
