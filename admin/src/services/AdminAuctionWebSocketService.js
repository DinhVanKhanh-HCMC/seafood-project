class AdminAuctionWebSocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.auctionId = null;
  }

  connect(auctionId) {
    this.auctionId = auctionId;
    
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.disconnect();
    }

    const wsUrl = `ws://localhost:8080/ws/auctions`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('🔌 Admin connected to auction WebSocket');
      this.reconnectAttempts = 0;
      // join ngay + dự phòng
      this.joinAuction(auctionId);
      setTimeout(() => this.joinAuction(auctionId), 200);
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
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('❌ Admin WebSocket error:', error);
    };
  }

  joinAuction(auctionId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'joinAuction',
        auctionId: auctionId
      }));
    }
  }

  // Admin có thể kết thúc đấu giá
  endAuction(auctionId) {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const responseType = 'auctionEndedByAdmin'; // type server sẽ gửi
        const tempHandler = (message) => {
          if (message.type === responseType) {
            resolve(message);
            this.messageHandlers.delete(responseType);
          } else if (message.type === 'error' && message.message.includes('đấu giá')) {
            reject(new Error(message.message));
            this.messageHandlers.delete(responseType);
          }
        };
        this.messageHandlers.set(responseType, tempHandler);

        this.socket.send(JSON.stringify({ type: 'endAuction', auctionId }));

        setTimeout(() => {
          this.messageHandlers.delete(responseType);
          reject(new Error('Timeout: Không nhận được phản hồi từ server'));
        }, 10000);
      } else {
        reject(new Error('WebSocket chưa kết nối'));
      }
    });
  }

  // Admin có thể gia hạn thời gian
  extendTime(auctionId, additionalMinutes) {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const responseType = 'timeExtended';
        const tempHandler = (message) => {
          if (message.type === responseType) {
            resolve(message);
            this.messageHandlers.delete(responseType);
          } else if (message.type === 'error' && message.message.includes('thời gian')) {
            reject(new Error(message.message));
            this.messageHandlers.delete(responseType);
          }
        };
        this.messageHandlers.set(responseType, tempHandler);

        this.socket.send(JSON.stringify({
          type: 'extendTime',
          auctionId,
          additionalMinutes
        }));

        setTimeout(() => {
          this.messageHandlers.delete(responseType);
          reject(new Error('Timeout: Không nhận được phản hồi từ server'));
        }, 10000);
      } else {
        reject(new Error('WebSocket chưa kết nối'));
      }
    });
  }

  onMessage(type, handler) {
    this.messageHandlers.set(type, handler);
  }

  handleMessage(message) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
      return;
    }
    // fallback: nếu có global error handler
    const errHandler = this.messageHandlers.get('error');
    if (errHandler && message.type === 'error') {
      errHandler(message);
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts && this.auctionId) {
      this.reconnectAttempts++;
      console.log(`🔄 Admin attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(this.auctionId);
      }, 3000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers.clear();
    this.auctionId = null;
  }
}

export default new AdminAuctionWebSocketService();