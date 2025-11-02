// services/ClientAuctionWebSocketService.js
class ClientAuctionWebSocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.auctionId = null;
    this.token = null;
  }

  connect(auctionId) {
    this.auctionId = auctionId;
    this.token = localStorage.getItem("token");
    
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.disconnect();
    }

    const wsUrl = `ws://localhost:8080/ws/auctions`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('🔌 Client connected to auction WebSocket');
      this.reconnectAttempts = 0;
      // Join auction room
      this.joinAuction(auctionId);
      setTimeout(() => this.joinAuction(auctionId), 200);
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('📨 Client received auction message:', message);
        this.handleMessage(message);
      } catch (error) {
        console.error('❌ Client error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('🔌 Client WebSocket disconnected');
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('❌ Client WebSocket error:', error);
    };
  }

  joinAuction(auctionId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'joinAuction',
        auctionId: auctionId,
        token: this.token
      }));
    }
  }

  // Client đặt giá
  placeBid(auctionId, amount) {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const responseType = 'bidAccepted';
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

        this.socket.send(JSON.stringify({
          type: 'placeBid',
          auctionId: auctionId,
          amount: amount,
          token: this.token
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

  // Lắng nghe các sự kiện real-time
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
      console.log(`🔄 Client attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
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

  // Kiểm tra kết nối
  isConnected() {
    return this.socket && this.socket.readyState === WebSocket.OPEN;
  }
}

export default new ClientAuctionWebSocketService();