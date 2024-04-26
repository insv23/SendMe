import React, { useState, useEffect, useCallback } from "react";
import MessageList from "./MessageList";
import messageService from "../services/message";
import useWebSocket from "../hooks/useWebSocket";
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
  }, []);

  // 使用useCallback钩子定义一个名为handleNewMessage的回调函数。
  // useCallback确保这个函数在组件的多次渲染之间保持不变，除非其依赖项数组中的元素发生变化。
  // 在这个例子中，依赖项数组是空的([])，这意味着函数在组件的整个生命周期内保持不变。
  const handleNewMessage = useCallback((newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  }, []);

  // 调用自定义的useWebSocket钩子，传入handleNewMessage函数。
  // useWebSocket钩子负责建立和管理WebSocket连接，以及处理从WebSocket接收到的消息。
  // 当从WebSocket接收到新消息时，useWebSocket会调用handleNewMessage函数，
  // 并将接收到的消息作为参数传递给这个函数。
  useWebSocket(handleNewMessage);

  // 处理删除消息
  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(message => message.message_id !== messageId));
  };
  
  return (
    <div className="flex flex-col max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-[#D9D9D9]">
      <TopBar />
      <Input />
      <MessageList messages={messages} onDeleteMessage={handleDeleteMessage} />
    </div>
  );
};

export default MessagesPage;
