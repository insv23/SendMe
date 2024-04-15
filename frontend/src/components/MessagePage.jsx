import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import messageService from '../services/message';
import Input from './Input';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getAll().then((messages) => setMessages(messages));
  }, []);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col max-w-md">
      <Input onMessageSend={addMessage} />
      <MessageList messages={messages} />
    </div>
  );
};

export default MessagesPage;