"use client"

import { useState, useEffect } from "react"
import ClientAuctionWebSocketService from "../../services/ClientAuctionWebSocketService"
import { authEvents } from "../../utils/authEvents"
import ApiService from "../../services/apis"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function AuctionDetail({ auction, onBack, onPlaceBid }) {
  const [bidAmount, setBidAmount] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notification, setNotification] = useState(null)
  const [realTimeAuction, setRealTimeAuction] = useState(auction)
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState([])
  const [isWinner, setIsWinner] = useState(false) // Thêm state kiểm tra người thắng
  const navigate = useNavigate()

  const fetchCurrentUser = async () => {
      try {
        const response = await ApiService.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        toast.error("Không thể tải thông tin đơn hàng");
        console.error(error);
      }
    };
  
  useEffect(() => {
      fetchCurrentUser();
  }, []);

  // Hàm kiểm tra xem user hiện tại có phải là người thắng cuộc không
  const checkIfWinner = async () => {
    try {
      if (user.id && realTimeAuction.status === "ended") {
        // Gọi API để kiểm tra người thắng
        const response = await ApiService.getAuctionWinner(realTimeAuction.id);
        if (response.data.winnerId === user.id) {
          setIsWinner(true);
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra người thắng:", error);
    }
  };

  useEffect(() => {
    if (user.id && realTimeAuction.status === "ended") {
      checkIfWinner();
    }
  }, [user.id, realTimeAuction.status, realTimeAuction.id]);

  // Hàm xử lý thanh toán - chuyển đến giỏ hàng với sản phẩm đấu giá
  const handlePayment = async () => {
    try {
      // Tạo đối tượng sản phẩm từ đấu giá
      const auctionProduct = {
        productId: currentAuction.productId,
        name: currentAuction.title,
        price: currentAuction.currentBid,
        quantity: 1,
        images: [currentAuction.image],
        weight: currentAuction.weight,
        origin: currentAuction.location,
        grade: currentAuction.grade,
        freshness: currentAuction.freshness,
        isAuction: true, // Đánh dấu là sản phẩm từ đấu giá
        auctionId: currentAuction.id,
        auctionPrice: currentAuction.currentBid
      };

      // Chuyển đến trang giỏ hàng với state
      navigate("/cart", { 
        state: { 
          auctionProduct: auctionProduct,
          fromAuction: true
        }
      });
      
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi chuyển đến giỏ hàng!"
      });
    }
  };

  // Hàm định dạng tiền Việt Nam
  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  // Hàm định dạng số tiền input (chỉ hiển thị số, không có ký tự tiền tệ)
  const formatBidAmount = (amount) => {
    return amount ? parseInt(amount).toLocaleString('vi-VN') : ""
  }

  // Hàm xử lý khi nhập giá đấu
  const handleBidAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '') // Chỉ cho phép số
    setBidAmount(value)
  }

  // Kết nối WebSocket khi component mount và auction là live
  useEffect(() => {
    if (auction.status === "live" && !ClientAuctionWebSocketService.isConnected()) {
      connectToWebSocket();
    }

    return () => {
      // Chỉ ngắt nếu thực sự đang kết nối
      if (ClientAuctionWebSocketService.isConnected()) {
        ClientAuctionWebSocketService.disconnect();
      }
    };
  }, [auction.id, auction.status]);

  const connectToWebSocket = () => {
    if (!auction?.id) return;

    try {
      // 1️⃣ Kết nối WebSocket (chỉ gọi 1 lần)
      ClientAuctionWebSocketService.connect(auction.id);

      // 2️⃣ Khi kết nối thành công
      ClientAuctionWebSocketService.onMessage('connected', () => {
        setIsConnected(true);
        console.log(`✅ Connected to auction room #${auction.id}`);
      });
      

      // 4️⃣ Khi có người khác đặt giá
      ClientAuctionWebSocketService.onMessage('newBid', (message) => {
        console.log("📩 newBid message:", message);
        setRealTimeAuction(prev => ({
          ...prev,
          currentBid: message.bid.amount,
          bidCount: (prev?.bidCount || 0) + 1,
          bidHistory: [
            {
              bidder: message.bid.userId,
              amount: message.bid.amount,
              time: message.bid.bidTime
            },
            ...(prev?.bidHistory || [])
          ]
        }));

        if(message.bid.userId === user.id){
          setNotification({
            type: "success",
            message: `Bạn vừa đặt giá ${formatVND(message.bid.amount)} thành công!`
          });
        }else{
          setNotification({
            type: "info",
            message: `Có người vừa đặt giá ${formatVND(message.bid.amount)}!`
          });
        }

        
      });

      // 5️⃣ Khi đấu giá kết thúc
      ClientAuctionWebSocketService.onMessage('auctionEnded', (message) => {
        setRealTimeAuction(prev => ({
          ...prev,
          status: "ended",
          winnerName: message.winnerName,
          winnerId: message.winnerId, // Thêm winnerId từ message
          currentBid: message.finalPrice
        }));

        // Kiểm tra xem user hiện tại có phải là người thắng không
        if (message.winnerId === user.id) {
          setIsWinner(true);
        }

        setNotification({
          type: "info",
          message: `Đấu giá đã kết thúc! Người thắng: ${message.winnerName}`
        });
      });

      // 6️⃣ Khi thời gian được gia hạn
      ClientAuctionWebSocketService.onMessage('timeExtended', (message) => {
        setRealTimeAuction(prev => ({
          ...prev,
          endTime: new Date(message.newEndTime)
        }));

        setNotification({
          type: "info",
          message: `Đấu giá được gia hạn thêm ${message.additionalMinutes} phút!`
        });
      });

      // 7️⃣ Khi có lỗi từ server
      ClientAuctionWebSocketService.onMessage('error', (message) => {
        setNotification({
          type: "error",
          message: message.message || "Lỗi không xác định từ server"
        });
      });

    } catch (error) {
      console.error('❌ Failed to connect to WebSocket:', error);
      setNotification({
        type: "error",
        message: "Không thể kết nối đến phiên đấu giá real-time"
      });
    }
  };


  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const formatTimeLeft = (endTime) => {
    const now = currentTime
    const diff = endTime - now
    if (diff <= 0) return "Đã kết thúc"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    if (minutes > 0) return `${minutes}m ${seconds}s`
    return `${seconds}s`
  }

  const handlePlaceBid = async (e) => {
    e.preventDefault()

    console.log("🔍 User object:", user);
    console.log(user.id)
    console.log(user.fullName)
    
    // Kiểm tra đăng nhập
    const token = localStorage.getItem("token")
    if (!token) {
      authEvents.openModal();
      
      const handleLoginSuccess = () => {
        // Sau khi đăng nhập, thử đặt giá lại
        handlePlaceBid(e);
        window.removeEventListener('authLoginSuccess', handleLoginSuccess);
      };
      
      window.addEventListener('authLoginSuccess', handleLoginSuccess);
      return;
    }

    const bidValue = parseFloat(bidAmount.replace(/[^\d]/g, ''))
    
    if (!bidAmount || bidValue < realTimeAuction.minBid) {
      setNotification({
        type: "error",
        message: `Vui lòng nhập giá đấu tối thiểu ${formatVND(realTimeAuction.minBid)}!`
      })
      return
    }

    try {
      console.log("🔍 User ID:", user?.id);
      console.log("🔍 User fullName:", user?.fullName);

      const bidData = {
          amount: bidAmount,
          userId: user.id, // ID của admin
          userName: user.fullName
      };
      // Sử dụng WebSocket để đặt giá real-time
      await ApiService.placeBid(realTimeAuction.id, bidData)
      // Notification sẽ được xử lý trong WebSocket message handler
      setBidAmount('')
      
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Đấu giá thất bại!"
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "live": return "bg-red-500"
      case "upcoming": return "bg-blue-500"
      case "ended": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "live": return "ĐANG DIỄN RA"
      case "upcoming": return "SẮP DIỄN RA"
      case "ended": return "ĐÃ KẾT THÚC"
      default: return ""
    }
  }

  const currentAuction = realTimeAuction;

  if (!auction || !auction.id) {
    return <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === "success" 
            ? "bg-green-500 text-white" 
            : notification.type === "info"
            ? "bg-blue-500 text-white"
            : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {isConnected && currentAuction.status === "live" && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Auction Info */}
        <div className="lg:col-span-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 p-3 bg-amber-600 text-white hover:text-amber-400 font-medium mb-6 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Trở Về
          </button>

          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <div className="relative">
              <img
                src={currentAuction.image}
                alt={currentAuction.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className={`absolute top-4 left-4 ${getStatusColor(currentAuction.status)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2`}>
                {currentAuction.status === "live" && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
                {getStatusText(currentAuction.status)}
                {isConnected && currentAuction.status === "live" && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold mb-1">{currentAuction.title}</h2>
                <p className="text-white/90">{currentAuction.seller}</p>
              </div>
            </div>

            <div className="p-8">
              {/* Product Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">📍</div>
                  <div className="text-sm text-gray-500">Nguồn gốc</div>
                  <div className="font-semibold text-gray-800">{currentAuction.location}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">⚖️</div>
                  <div className="text-sm text-gray-500">Trọng lượng</div>
                  <div className="font-semibold text-gray-800">{currentAuction.weight}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="text-sm text-gray-500">Cấp độ</div>
                  <div className="font-semibold text-gray-800">{currentAuction.grade}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">🧊</div>
                  <div className="text-sm text-gray-500">Tình trạng</div>
                  <div className="font-semibold text-gray-800">{currentAuction.freshness}</div>
                </div>
              </div>

              {/* Bid History */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Lịch sử đấu giá {currentAuction.status === "live" && "(Real-time)"}</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4">
                    {currentAuction.bidHistory.length > 0 ? (
                      currentAuction.bidHistory.map((bid, index) => (
                        <div key={index} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="font-medium text-gray-800">
                              {bid.bidder === user.id
                                ? "Bạn"
                                : `User***${bid.bidder?.substring(0, 4)}`}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">{formatVND(bid.amount)}</div>
                            <div className="text-sm text-gray-500"> {new Date(bid.time).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">🎯</div>
                        <p>Chưa có lượt đấu giá nào</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bidding Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {formatVND(currentAuction.currentBid || currentAuction.minBid)}
              </div>
              <div className="text-sm text-gray-500">
                {currentAuction.status === "live" ? "Giá hiện tại" : 
                  currentAuction.status === "upcoming" ? "Giá khởi điểm" : "Giá cuối"}
              </div>
              <div className="text-sm text-gray-400">{realTimeAuction.bidCount} lượt đấu</div>
            </div>

            {currentAuction.status === "live" && (
              <>
                <div className="text-center mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatTimeLeft(currentAuction.endTime)}
                  </div>
                  <div className="text-sm text-red-500 font-medium">Thời gian còn lại</div>
                  {isConnected && (
                    <div className="text-xs text-green-600 mt-1">✅ Kết nối real-time</div>
                  )}
                </div>

                <form onSubmit={handlePlaceBid} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Giá đấu của bạn (VND)</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₫</div>
                      <input
                        type="text"
                        value={formatBidAmount(bidAmount)}
                        onChange={handleBidAmountChange}
                        placeholder={formatVND(currentAuction.currentBid + (currentAuction.bidStep || 100000))}
                        className="w-full pl-8 pr-4 py-4 text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isConnected}
                  >
                    {isConnected ? "🎯 Đấu Giá Ngay" : "⏳ Đang kết nối..."}
                  </button>
                </form>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 text-center">
                    <span className="font-semibold">Giá tối thiểu:</span> {formatVND(currentAuction.currentBid + (currentAuction.bidStep || 100000))}
                  </p>
                </div>
              </>
            )}

            {currentAuction.status === "upcoming" && (
              <div className="text-center">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mb-6">
                  <div className="text-lg font-semibold text-blue-800 mb-2">Đấu giá bắt đầu sau</div>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{currentAuction.timeLeft}</div>
                </div>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 rounded-xl font-semibold transition-colors">
                  🔔 Đặt Nhắc Nhở
                </button>
              </div>
            )}

            {currentAuction.status === "ended" && (
              <div className="text-center">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-6">
                  <div className="text-lg font-semibold text-gray-600 mb-2">Đấu giá đã kết thúc</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatVND(currentAuction.currentBid)}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    🏆 Người thắng: <span className="font-semibold">{currentAuction.winnerName}</span>
                  </div>
                  
                  {/* Hiển thị thông báo và nút thanh toán cho người thắng */}
                  {isWinner && (
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-300 mb-4">
                      <div className="text-amber-700">
                        <div className="font-semibold text-lg">🎉 Chúc mừng bạn đã thắng!</div>
                        <div className="text-sm mt-1">Vui lòng hoàn tất thanh toán cho sản phẩm</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hiển thị nút thanh toán cho người thắng */}
                {isWinner && (
                  <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 mb-4"
                  >
                    💳 Thanh Toán Ngay
                  </button>
                )}

                <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed">
                  Đấu Giá Đã Đóng
                </button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-800">{currentAuction.bidCount}</div>
                  <div className="text-xs text-gray-500">Lượt đấu</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{currentAuction.category}</div>
                  <div className="text-xs text-gray-500">Danh mục</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}