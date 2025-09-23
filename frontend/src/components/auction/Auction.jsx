"use client"

import { useState, useEffect } from "react"



export default function AuctionPage() {
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [bidAmount, setBidAmount] = useState("")
  const [activeTab, setActiveTab] = useState("live")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notification, setNotification] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("timeLeft")

  const auctions = [
    {
      id: 1,
      title: "Cá Hồi Atlantic Cao Cấp - 50 lbs",
      currentBid: 1250,
      minBid: 1300,
      bidCount: 23,
      timeLeft: "2h 15m",
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000),
      image: `${import.meta.env.BASE_URL}assets/image_auction1.jpg`,
      seller: "Nordic Fisheries",
      location: "Na Uy",
      weight: "22.7 kg",
      grade: "Cao Cấp",
      status: "live",
      description: "Cá hồi Atlantic tươi, đánh bắt sáng nay. Loại cao cấp với vân thịt tuyệt đẹp, thích hợp cho nhà hàng sang trọng.",
      bidHistory: [
        { bidder: "User***23", amount: 1250, time: "2 phút trước" },
        { bidder: "Chef***45", amount: 1200, time: "5 phút trước" },
        { bidder: "Rest***12", amount: 1150, time: "8 phút trước" },
      ],
      category: "Cá",
      freshness: "Tươi sống",
      origin: "Vùng biển Bắc Đại Tây Dương"
    },
    {
      id: 2,
      title: "Tôm Hùm Maine - 24 con",
      currentBid: 890,
      minBid: 920,
      bidCount: 18,
      timeLeft: "45m",
      endTime: new Date(Date.now() + 45 * 60 * 1000),
      image: `${import.meta.env.BASE_URL}assets/image_auction2.jpg`,
      seller: "Maine Coast Lobsters",
      location: "Maine, Hoa Kỳ",
      weight: "16.3 kg tổng",
      grade: "Hạng A",
      status: "live",
      description: "Tôm hùm Maine tươi, trung bình 680g/con. Hoàn hảo cho các nhà hàng cao cấp.",
      bidHistory: [
        { bidder: "Buyer***67", amount: 890, time: "1 phút trước" },
        { bidder: "Fish***89", amount: 850, time: "4 phút trước" },
        { bidder: "Sea***34", amount: 800, time: "7 phút trước" },
      ],
      category: "Giáp xác",
      freshness: "Tươi sống",
      origin: "Vịnh Maine"
    },
    {
      id: 3,
      title: "Thịt Cá Ngừ Vây Vàng - 20 lbs",
      currentBid: 2100,
      minBid: 2150,
      bidCount: 31,
      timeLeft: "1h 32m",
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 32 * 60 * 1000),
      image: `${import.meta.env.BASE_URL}assets/image_auction3.jpg`,
      seller: "Pacific Tuna Co.",
      location: "Hawaii, Hoa Kỳ",
      weight: "9.1 kg",
      grade: "Sushi Grade",
      status: "live",
      description: "Thịt cá ngừ vây vàng cấp sushi. Đông lạnh nhanh trên biển để đảm bảo độ tươi tối đa.",
      bidHistory: [
        { bidder: "Sushi***56", amount: 2100, time: "30 giây trước" },
        { bidder: "Rest***78", amount: 2050, time: "3 phút trước" },
        { bidder: "Chef***90", amount: 2000, time: "6 phút trước" },
      ],
      category: "Cá",
      freshness: "Đông lạnh",
      origin: "Thái Bình Dương"
    },
    {
      id: 4,
      title: "Chân Cua Hoàng - 15 lbs",
      currentBid: 0,
      minBid: 450,
      bidCount: 0,
      timeLeft: "Bắt đầu sau 2h",
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      image: `${import.meta.env.BASE_URL}assets/image_auction4.jpg`,
      seller: "Alaskan Crab Co.",
      location: "Alaska, Hoa Kỳ",
      weight: "6.8 kg",
      grade: "Cao Cấp",
      status: "upcoming",
      description: "Chân cua hoàng Alaska, đã nấu chín và đông lạnh nhanh.",
      bidHistory: [],
      category: "Giáp xác",
      freshness: "Đông lạnh",
      origin: "Biển Bering"
    },
    {
      id: 5,
      title: "Hàu Tươi - 100 con",
      currentBid: 320,
      minBid: 0,
      bidCount: 12,
      timeLeft: "Đã kết thúc",
      endTime: new Date(Date.now() - 30 * 60 * 1000),
      image: `${import.meta.env.BASE_URL}assets/image_auction5.jpg`,
      seller: "Chesapeake Oyster Farm",
      location: "Maryland, Hoa Kỳ",
      weight: "11.3 kg",
      grade: "Cao Cấp",
      status: "ended",
      description: "Hàu tươi vịnh Chesapeake, thu hoạch hôm qua.",
      bidHistory: [
        { bidder: "Oyster***12", amount: 320, time: "30 phút trước" },
        { bidder: "Rest***45", amount: 300, time: "35 phút trước" },
        { bidder: "Chef***67", amount: 280, time: "40 phút trước" },
      ],
      winner: "Oyster***12",
      category: "Nhuyễn thể",
      freshness: "Tươi sống",
      origin: "Vịnh Chesapeake"
    },
  ]

  // Filter auctions based on active tab and search query
  const filteredAuctions = auctions.filter((auction) => {
    const matchesStatus = auction.status === activeTab
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (selectedAuction && bidAmount && Number.parseFloat(bidAmount) >= selectedAuction.minBid) {
      setNotification({
        type: "success",
        message: `Đấu giá thành công với giá $${bidAmount}!`
      })
      setBidAmount("")
      
      // Update auction data (simulate)
      const updatedAuction = {
        ...selectedAuction,
        currentBid: Number.parseFloat(bidAmount),
        bidCount: selectedAuction.bidCount + 1,
        bidHistory: [
          { bidder: "Bạn", amount: Number.parseFloat(bidAmount), time: "Vừa xong" },
          ...selectedAuction.bidHistory
        ]
      }
      setSelectedAuction(updatedAuction)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
        {selectedAuction ? (
          /* Auction Detail View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Auction Info */}
            <div className="lg:col-span-2">
              <button
                onClick={() => setSelectedAuction(null)}
                className="inline-flex items-center gap-2 p-3 bg-amber-600 text-white hover:text-amber-400 font-medium mb-6 transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform"></span>
                Trở Về
              </button>

              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <div className="relative">
                  <img
                    src={selectedAuction.image}
                    alt={selectedAuction.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className={`absolute top-4 left-4 ${getStatusColor(selectedAuction.status)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2`}>
                    {selectedAuction.status === "live" && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                    {getStatusText(selectedAuction.status)}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-3xl font-bold mb-1">{selectedAuction.title}</h2>
                    <p className="text-white/90">{selectedAuction.seller}</p>
                  </div>
                </div>

                <div className="p-8">
                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl mb-2">📍</div>
                      <div className="text-sm text-gray-500">Nguồn gốc</div>
                      <div className="font-semibold text-gray-800">{selectedAuction.location}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl mb-2">⚖️</div>
                      <div className="text-sm text-gray-500">Trọng lượng</div>
                      <div className="font-semibold text-gray-800">{selectedAuction.weight}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl mb-2">⭐</div>
                      <div className="text-sm text-gray-500">Cấp độ</div>
                      <div className="font-semibold text-gray-800">{selectedAuction.grade}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl mb-2">🧊</div>
                      <div className="text-sm text-gray-500">Tình trạng</div>
                      <div className="font-semibold text-gray-800">{selectedAuction.freshness}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Mô tả sản phẩm</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{selectedAuction.description}</p>
                    <div className="mt-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                      <p className="text-amber-600"><strong>Vùng đánh bắt:</strong> {selectedAuction.origin}</p>
                    </div>
                  </div>

                  {/* Bid History */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Lịch sử đấu giá</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-4">
                        {selectedAuction.bidHistory.length > 0 ? (
                          selectedAuction.bidHistory.map((bid, index) => (
                            <div key={index} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {index + 1}
                                </div>
                                <span className="font-medium text-gray-800">{bid.bidder}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-green-600">${bid.amount.toLocaleString()}</div>
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
                    ${(selectedAuction.currentBid || selectedAuction.minBid).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedAuction.status === "live" ? "Giá hiện tại" : 
                     selectedAuction.status === "upcoming" ? "Giá khởi điểm" : "Giá cuối"}
                  </div>
                  <div className="text-sm text-gray-400">{selectedAuction.bidCount} lượt đấu</div>
                </div>

                {selectedAuction.status === "live" && (
                  <>
                    <div className="text-center mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {formatTimeLeft(selectedAuction.endTime)}
                      </div>
                      <div className="text-sm text-red-500 font-medium">Thời gian còn lại</div>
                    </div>

                    <form onSubmit={handlePlaceBid} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Giá đấu của bạn</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</div>
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            min={selectedAuction.minBid}
                            step="10"
                            placeholder={selectedAuction.minBid.toString()}
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
                        <span className="font-semibold">Giá tối thiểu:</span> ${selectedAuction.minBid.toLocaleString()}
                      </p>
                    </div>
                  </>
                )}

                {selectedAuction.status === "upcoming" && (
                  <div className="text-center">
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mb-6">
                      <div className="text-lg font-semibold text-blue-800 mb-2">Đấu giá bắt đầu sau</div>
                      <div className="text-2xl font-bold text-blue-600 mb-4">{selectedAuction.timeLeft}</div>
                    </div>
                    <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 rounded-xl font-semibold transition-colors">
                      🔔 Đặt Nhắc Nhở
                    </button>
                  </div>
                )}

                {selectedAuction.status === "ended" && (
                  <div className="text-center">
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-6">
                      <div className="text-lg font-semibold text-gray-600 mb-2">Đấu giá đã kết thúc</div>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        ${selectedAuction.currentBid.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        🏆 Người thắng: <span className="font-semibold">{selectedAuction.winner}</span>
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
                      <div className="text-lg font-bold text-gray-800">{selectedAuction.bidCount}</div>
                      <div className="text-xs text-gray-500">Lượt đấu</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{selectedAuction.category}</div>
                      <div className="text-xs text-gray-500">Danh mục</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Auction List View */
          <>
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
                  onClick={() => setSelectedAuction(auction)}
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
                          ${(auction.currentBid || auction.minBid).toLocaleString()}
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
            <div className="mt-12 bg-gradient-to-r bg-amber-600  rounded-2xl p-8 text-white">
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
                    ${auctions.reduce((sum, a) => sum + (a.currentBid || a.minBid), 0).toLocaleString()}
                  </div>
                  <div className="text-blue-100">Tổng giá trị</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Action Button for Quick Access */}
      {!selectedAuction && (
        <div className="fixed bottom-8 right-8 z-40">
          <button 
            onClick={() => {
              const liveAuctions = auctions.filter(a => a.status === "live")
              if (liveAuctions.length > 0) {
                setSelectedAuction(liveAuctions[0])
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
      )}

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent rounded-full transform rotate-12"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-100/30 to-transparent rounded-full transform -rotate-12"></div>
      </div>
    </div>
  )
}