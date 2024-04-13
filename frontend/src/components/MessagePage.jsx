import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';
import MessageList from './MessageList';
import messageService from '../services/message';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getAll().then((messages) => setMessages(messages));
  }, []);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <MessageList messages={messages} />
      <InputBox onMessageSend={addMessage} />
    </div>
  );
};

export default MessagesPage;