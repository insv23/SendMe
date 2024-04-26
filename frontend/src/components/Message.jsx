import FormattedDateTime from "./FormattedDateTime";
import MessageOptionsDropdown from "./MessageOptionsDropdown";
import MessageFiles from "./MessageFiles";
import MessageText from "./MessageText";

import messageService from "../services/message";

import toast, { Toaster } from 'react-hot-toast';

const Message = ({ message, onDeleteMessage }) => {
  const handleDelete = async () => {
    try {
      await messageService.deleteMessage(message.message_id);
      toast.success('Message deleted successfully');
      onDeleteMessage(message.message_id);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="p-4 m-2 bg-[#202020] rounded-md">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <FormattedDateTime dateTime={message.message_creation_time} />
        <MessageOptionsDropdown onDelete={handleDelete} />
      </div>
      <MessageText text={message.message_text} />
      <MessageFiles files={message.message_files} />
    </div>
  );
};

export default Message;
