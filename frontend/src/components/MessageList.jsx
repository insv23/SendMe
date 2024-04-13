import Message from "./Message";


const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
