import { useState, useEffect } from 'react';

const url = import.meta.env.VITE_APP_WEBSOCKET_URL;

const useWebSocket = (onMessageReceived) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'newMessage') {
        onMessageReceived(data.message);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [onMessageReceived]);

  return messages;
};

export default useWebSocket;