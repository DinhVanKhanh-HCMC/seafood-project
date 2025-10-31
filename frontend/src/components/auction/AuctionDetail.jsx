"use client"

import { useState, useEffect } from "react"

export default function AuctionDetail({ auction, onBack, onPlaceBid }) {
  const [bidAmount, setBidAmount] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notification, setNotification] = useState(null)

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

  const handlePlaceBid = (e) => {
    e.preventDefault()
    const bidValue = parseInt(bidAmount.replace(/[^\d]/g, ''))
    if (bidAmount && bidValue >= auction.minBid) {
      const success = onPlaceBid(auction.id, bidValue)
      if (success) {
        setNotification({
          type: "success",
          message: `Đấu giá thành công với giá ${formatVND(bidValue)}!`
        })
        setBidAmount("")
      } else {
        setNotification({
          type: "error",
          message: "Đấu giá thất bại!"
        })
      }
    } else {
      setNotification({
        type: "error",
        message: "Vui lòng nhập giá đấu hợp lệ!"
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === "success" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
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
            <span className="group-hover:-translate-x-1 transition-transform"></span>
            Trở Về
          </button>

          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <div className="relative">
              <img
                src={auction.image}
                alt={auction.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className={`absolute top-4 left-4 ${getStatusColor(auction.status)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2`}>
                {auction.status === "live" && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
                {getStatusText(auction.status)}
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold mb-1">{auction.title}</h2>
                <p className="text-white/90">{auction.seller}</p>
              </div>
            </div>

            <div className="p-8">
              {/* Product Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">📍</div>
                  <div className="text-sm text-gray-500">Nguồn gốc</div>
                  <div className="font-semibold text-gray-800">{auction.location}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">⚖️</div>
                  <div className="text-sm text-gray-500">Trọng lượng</div>
                  <div className="font-semibold text-gray-800">{auction.weight}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="text-sm text-gray-500">Cấp độ</div>
                  <div className="font-semibold text-gray-800">{auction.grade}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">🧊</div>
                  <div className="text-sm text-gray-500">Tình trạng</div>
                  <div className="font-semibold text-gray-800">{auction.freshness}</div>
                </div>
              </div>

              {/* Bid History */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Lịch sử đấu giá</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4">
                    {auction.bidHistory.length > 0 ? (
                      auction.bidHistory.map((bid, index) => (
                        <div key={index} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="font-medium text-gray-800">{bid.bidder}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">{formatVND(bid.amount)}</div>
                            <div className="text-sm text-gray-500">{bid.time}</div>
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
                {formatVND(auction.currentBid || auction.minBid)}
              </div>
              <div className="text-sm text-gray-500">
                {auction.status === "live" ? "Giá hiện tại" : 
                  auction.status === "upcoming" ? "Giá khởi điểm" : "Giá cuối"}
              </div>
              <div className="text-sm text-gray-400">{auction.bidCount} lượt đấu</div>
            </div>

            {auction.status === "live" && (
              <>
                <div className="text-center mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatTimeLeft(auction.endTime)}
                  </div>
                  <div className="text-sm text-red-500 font-medium">Thời gian còn lại</div>
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
                        placeholder={auction.minBid.toLocaleString('vi-VN')}
                        className="w-full pl-8 pr-4 py-4 text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    🎯 Đấu Giá Ngay
                  </button>
                </form>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 text-center">
                    <span className="font-semibold">Giá tối thiểu:</span> {formatVND(auction.minBid)}
                  </p>
                </div>
              </>
            )}

            {auction.status === "upcoming" && (
              <div className="text-center">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mb-6">
                  <div className="text-lg font-semibold text-blue-800 mb-2">Đấu giá bắt đầu sau</div>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{auction.timeLeft}</div>
                </div>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 rounded-xl font-semibold transition-colors">
                  🔔 Đặt Nhắc Nhở
                </button>
              </div>
            )}

            {auction.status === "ended" && (
              <div className="text-center">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-6">
                  <div className="text-lg font-semibold text-gray-600 mb-2">Đấu giá đã kết thúc</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatVND(auction.currentBid)}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    🏆 Người thắng: <span className="font-semibold">{auction.winner}</span>
                  </div>
                </div>
                <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed">
                  Đấu Giá Đã Đóng
                </button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-800">{auction.bidCount}</div>
                  <div className="text-xs text-gray-500">Lượt đấu</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{auction.category}</div>
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