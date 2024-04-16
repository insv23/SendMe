import FormattedDateTime from "./FormattedDateTime";
import MessageFiles from "./MessageFiles";
import MessageText from "./MessageText";

const Message = ({ message }) => {
  const fileUrlBase = "http://localhost:9003/api/files/";

  return (
    <div className="p-4 m-2 bg-[#202020] rounded-md">
      <FormattedDateTime dateTime={message.message_creation_time} />
      <MessageText text={message.message_text} />
      <MessageFiles files={message.message_files} />
    </div>
  );
};

export default Message;
