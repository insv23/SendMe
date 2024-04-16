import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import messageService from '../services/message';
import Input from './Input';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getAll().then((messages) => {
      // 对获取到的消息按照创建时间降序排序
      const sortedMessages = messages.sort((a, b) => Date.parse(b.message_creation_time) - Date.parse(a.message_creation_time));
      setMessages(sortedMessages);
    });
  }, []);

  const addMessage = (newMessage) => {
    // 为了保持消息列表的顺序，新消息应该被添加到数组的开头
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="flex flex-col max-w-md text-[#D9D9D9]">
      <Input onMessageSend={addMessage} />
      <MessageList messages={messages} />
    </div>
  );
};

export default MessagesPage;