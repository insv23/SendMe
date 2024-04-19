class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
  }

  connect(onMessage) {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onmessage = (event) => {
      if (typeof onMessage === "function") {
        const data = JSON.parse(event.data);
        onMessage(data);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      // 可以在这里尝试重新连接
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      // 根据需要处理错误
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  // 可以添加更多方法，如发送消息等
}

export default WebSocketClient;
