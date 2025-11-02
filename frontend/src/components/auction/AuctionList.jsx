"use client"

import { useState, useEffect } from "react"
import { authEvents } from "../../utils/authEvents";


export default function AuctionList({ onSelectAuction, auctions }) {
  const [activeTab, setActiveTab] = useState("live")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("timeLeft")

  // Filter auctions based on active tab and search query
  const filteredAuctions = auctions.filter((auction) => {
    const matchesStatus = auction?.status === activeTab
    const matchesSearch = auction?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction?.seller?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction?.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Sort auctions
  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case "timeLeft":
        if (a.status === "ended" && b.status !== "ended") return 1
        if (b.status === "ended" && a.status !== "ended") return -1
        return a.endTime - b.endTime
      case "price":
        return (b.currentBid || b.minBid) - (a.currentBid || a.minBid)
      case "bids":
        return b.bidCount - a.bidCount
      default:
        return 0
    }
  })

  const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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

  const handleAuctionClick = (auction) => {
    const token = localStorage.getItem("token")
    
    if ((auction.status === "live" || auction.status === "ended") && !token) {
      
      authEvents.openModal();
      
      // Lắng nghe sự kiện đăng nhập thành công
      const handleLoginSuccess = () => {
        onSelectAuction(auction);
        
        window.removeEventListener('authLoginSuccess', handleLoginSuccess);
      };
      
      window.addEventListener('authLoginSuccess', handleLoginSuccess);
      return;
    }
    
    // Nếu đã đăng nhập hoặc không cần đăng nhập, chuyển đến trang chi tiết
    onSelectAuction(auction);
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
    <>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-amber-600 bg-clip-text text-transparent">
                Đấu Giá Hải Sản
              </h1>
              <p className="text-gray-600 mt-2">Đấu giá hải sản cao cấp trực tiếp từ nhà cung cấp</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Thời gian hiện tại</div>
                <div className="font-mono text-lg text-gray-800">
                  {currentTime.toLocaleTimeString("vi-VN")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, nhà cung cấp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
            >
              <option value="timeLeft">Sắp xếp: Thời gian</option>
              <option value="price">Sắp xếp: Giá</option>
              <option value="bids">Sắp xếp: Lượt đấu</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 w-fit mx-auto">
          {[
            { id: "live", label: "Đang Diễn Ra", count: auctions.filter(a => a.status === "live").length },
            { id: "upcoming", label: "Sắp Diễn Ra", count: auctions.filter(a => a.status === "upcoming").length },
            { id: "ended", label: "Đã Kết Thúc", count: auctions.filter(a => a.status === "ended").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-600 to-amber-400 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id ? "bg-white/20" : "bg-gray-200"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedAuctions.map((auction) => (
            <div
              key={auction.id}
              onClick={() => handleAuctionClick(auction)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 ${getStatusColor(auction.status)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                  {auction.status === "live" && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  )}
                  {getStatusText(auction.status)}
                </div>
                
                {/* Time Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  ⏰ {formatTimeLeft(auction.endTime)}
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-medium">
                    {auction.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight group-hover:text-amber-600 transition-colors">
                  {auction.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🏢</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{auction.seller}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-600">{auction.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">⚖️</span>
                    <span className="text-gray-600">{auction.weight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">⭐</span>
                    <span className="text-gray-600">{auction.grade}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">🧊</span>
                    <span className="text-gray-600">{auction.freshness}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(auction.currentBid || auction.minBid)}
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      {auction.status === "live"
                        ? "Giá hiện tại"
                        : auction.status === "upcoming"
                          ? "Giá khởi điểm"
                          : "Giá cuối"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      <span className="text-blue-500">🎯</span>
                      <span>{auction.bidCount}</span>
                    </div>
                    <div className="text-xs text-gray-500">lượt đấu</div>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 ${
                  auction.status === "live"
                    ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-800 hover:to-amber-700 text-white shadow-lg hover:shadow-xl"
                    : auction.status === "upcoming"
                      ? "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border border-gray-300"
                      : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                }`}>
                  {auction.status === "live"
                    ? "Đấu Giá Ngay"
                    : auction.status === "upcoming"
                      ? "Xem Chi Tiết"
                      : "Xem Kết Quả"}
                </button>

                {/* Winner Badge for Ended Auctions */}
                {auction.status === "ended" && auction.winner && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                    <div className="text-xs text-yellow-700">
                      🏆 <span className="font-semibold">Người thắng:</span> {auction.winner}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedAuctions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐠</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy cuộc đấu giá nào
            </h3>
            <p className="text-gray-500 mb-6">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <button 
              onClick={() => {
                setSearchQuery("")
                setActiveTab("live")
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Xem tất cả đấu giá
            </button>
          </div>
        )}

        {/* Statistics Footer */}
        <div className="mt-12 bg-gradient-to-r bg-amber-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{auctions.length}</div>
              <div className="text-blue-100">Tổng sản phẩm</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {auctions.filter(a => a.status === "live").length}
              </div>
              <div className="text-blue-100">Đang đấu giá</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {auctions.reduce((sum, a) => sum + a.bidCount, 0)}
              </div>
              <div className="text-blue-100">Tổng lượt đấu</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {formatPrice(auctions.reduce((sum, a) => sum + (a.currentBid || a.minBid), 0))}
              </div>
              <div className="text-blue-100">Tổng giá trị</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Quick Access */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => {
            const liveAuctions = auctions.filter(a => a.status === "live")
            if (liveAuctions.length > 0) {
              onSelectAuction(liveAuctions[0])
            }
          }}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
        >
          <span className="text-2xl group-hover:animate-pulse">🔥</span>
        </button>
        <div className="absolute bottom-20 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Xem đấu giá hot
        </div>
      </div>
    </>
  )
}