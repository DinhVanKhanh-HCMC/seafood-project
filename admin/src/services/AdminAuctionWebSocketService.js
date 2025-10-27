class AdminAuctionWebSocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(auctionId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.disconnect();
    }

    const wsUrl = `ws://localhost:8080/ws/auctions`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('🔌 Admin connected to auction WebSocket');
      this.reconnectAttempts = 0;
      
      // Join auction với vai trò admin
      this.joinAuction(auctionId);
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('📨 Admin received auction message:', message);
        this.handleMessage(message);
      } catch (error) {
        console.error('❌ Admin error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('🔌 Admin WebSocket disconnected');
      this.attemptReconnect(auctionId);
    };

    this.socket.onerror = (error) => {
      console.error('❌ Admin WebSocket error:', error);
    };
  }

  joinAuction(auctionId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'joinAuction',
        auctionId: auctionId,
        role: 'admin' // Gửi role admin để backend biết
      }));
    }
  }

  // Admin có thể kết thúc đấu giá
  endAuction(auctionId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'endAuction',
        auctionId: auctionId
      }));
    }
  }

  // Admin có thể gia hạn thời gian
  extendTime(auctionId, additionalMinutes) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'extendTime',
        auctionId: auctionId,
        additionalMinutes: additionalMinutes
      }));
    }
  }

  onMessage(type, handler) {
    this.messageHandlers.set(type, handler);
  }

  handleMessage(message) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    }
  }

  attemptReconnect(auctionId) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Admin attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(auctionId);
      }, 3000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers.clear();
  }
}

export default new AdminAuctionWebSocketService();