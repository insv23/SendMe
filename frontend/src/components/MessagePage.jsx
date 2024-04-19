import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import messageService from "../services/message";
import Input from "./Input";
import TopBar from "./TopBar";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getAll().then((messages) => {
      // 对获取到的消息按照创建时间降序排序
      const sortedMessages = messages.sort(
        (a, b) =>
          Date.parse(b.message_creation_time) -
          Date.parse(a.message_creation_time)
      );
      setMessages(sortedMessages);
    });

    // 建立WebSocket连接
    const ws = new WebSocket('ws://45.152.64.68:9003'); // 使用实际的WebSocket服务器地址

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'newMessage') {
        // 当接收到新消息时，将其添加到消息列表的开头
        setMessages((prevMessages) => [data.message, ...prevMessages]);
      }
    };

    // 组件卸载时关闭WebSocket连接
    return () => {
      ws.close();
    };


  }, []);

  const addMessage = (newMessage) => {
    // 为了保持消息列表的顺序，新消息应该被添加到数组的开头
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="flex flex-col max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-[#D9D9D9]">
      <TopBar />
      <Input onMessageSend={addMessage} />
      <MessageList messages={messages} />
    </div>
  );
};

export default MessagesPage;
