"use client"

import { useState, useEffect } from "react"
import "./LiveStream.css"
import image_2 from "../../../public/assets/image_livestream2.jpg"
import image_3 from "../../../public/assets/image_livestream3.jpg"
import image_4 from "../../../public/assets/image_livestream4.jpg"
import image_5 from "../../../public/assets/image_livestream5.jpg"
import image_6 from "../../../public/assets/image_livestream6.jpg"

export default function LivestreamingPage() {
  const [selectedStream, setSelectedStream] = useState(null)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "NgườiYêuCá23", message: "Con cá hồi này trông tuyệt vời!", time: "2 phút trước" },
    { id: 2, user: "BếpTrưởngMike", message: "Giá cá ngừ bao nhiêu vậy ạ?", time: "1 phút trước" },
    { id: 3, user: "ChuyênGiaHảiSản", message: "Hàng tươi sáng nay mới đánh bắt!", time: "30 giây trước" },
  ])
  const [viewerCount, setViewerCount] = useState(1247)

  const liveStreams = [
    {
      id: 1,
      title: "Chợ Cá Boston - Đấu Giá Buổi Sáng",
      streamer: "Chợ Hải Cảng Boston",
      viewers: 1247,
      category: "Đấu Giá Trực Tiếp",
      thumbnail: "/assets/image_livestream1.jpg",
      isLive: true,
      duration: "2:34:15",
      description: "Trực tiếp từ chợ cá hàng đầu Boston. Xem các mẻ cá tươi được đấu giá cho người trả giá cao nhất.",
    },
    {
      id: 2,
      title: "Lớp Học Chuẩn Bị Cá Hồi Chuyên Nghiệp",
      streamer: "Bếp Trưởng Rodriguez",
      viewers: 892,
      category: "Demo Nấu Ăn",
      thumbnail: image_2,
      isLive: true,
      duration: "1:15:30",
      description: "Học kỹ thuật phi lê và chuẩn bị cá hồi chuyên nghiệp từ một bếp trưởng bậc thầy.",
    },
    {
      id: 3,
      title: "Tour Thuyền Tôm Hùm Maine",
      streamer: "Thuyền Trưởng Sarah",
      viewers: 634,
      category: "Tham Quan Chợ",
      thumbnail: image_3,
      isLive: true,
      duration: "0:45:22",
      description: "Tham gia cùng chúng tôi trên thuyền tôm hùm Maine khi kiểm tra lưới và thu hoạch hàng ngày.",
    },
    {
      id: 4,
      title: "Tham Quan Trại Nuôi Hàu",
      streamer: "Hàu Chesapeake",
      viewers: 423,
      category: "Tham Quan Trại",
      thumbnail: image_4,
      isLive: false,
      duration: "Bắt đầu sau 30 phút",
      description: "Khám phá trại nuôi hàu của chúng tôi tại Vịnh Chesapeake và tìm hiểu về nuôi hàu bền vững.",
    },
  ]

  const upcomingStreams = [
    {
      id: 5,
      title: "Biểu Diễn Cắt Cá Ngừ",
      streamer: "Chợ Cá Tokyo",
      startTime: "2:00 PM EST",
      thumbnail: image_5,
      category: "Demo Nấu Ăn",
    },
    {
      id: 6,
      title: "Thuyền Tôm Đánh Bắt Trực Tiếp",
      streamer: "Ngư Dân Vịnh Gulf",
      startTime: "4:30 PM EST",
      thumbnail: image_6,
      category: "Đánh Bắt Trực Tiếp",
    },
  ]

  useEffect(() => {
    if (selectedStream) {
      const interval = setInterval(() => {
        setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 5)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [selectedStream])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "Bạn",
        message: chatMessage,
        time: "vừa xong",
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-orange-50"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 live-badge text-white px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-sm font-bold">TRỰC TIẾP</span>
          </div>
          <h1 className="text-orange-500 text-5xl font-bold mb-4">
            Livestream Hải Sản
          </h1>
          <p className="text-gray-600 text-xl">
            Xem đấu giá trực tiếp, demo nấu ăn và tham quan chợ hải sản
          </p>
        </div>

        {selectedStream ? (
          /* Main Stream View */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Video Player */}
            <div className="lg:col-span-3">
              <div className="bg-black rounded-2xl overflow-hidden relative" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                <img
                  src={selectedStream.thumbnail}
                  alt={selectedStream.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 live-badge text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  TRỰC TIẾP
                </div>
                
                {/* Viewer Count */}
                <div className="absolute top-4 right-4 viewer-count flex items-center gap-2">
                  <span>👁</span>
                  {viewerCount.toLocaleString()} người xem
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-4 left-4 viewer-count">
                  {selectedStream.duration}
                </div>
              </div>

              {/* Stream Info */}
              <div className="mt-6 bg-white rounded-2xl p-8" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedStream.title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(45deg, #1976d2, #00acc1)' }}>
                    {selectedStream.streamer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold text-lg">{selectedStream.streamer}</p>
                    <span className="category-tag">{selectedStream.category}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedStream.description}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary">
                    💰 Đặt Giá Thầu
                  </button>
                  <button className="btn-secondary">
                    👤 Theo Dõi Streamer
                  </button>
                  <button className="btn-secondary">
                    ❤️ Thích
                  </button>
                  <button 
                    onClick={() => setSelectedStream(null)}
                    className="btn-secondary"
                  >
                    ← Quay Lại Danh Sách
                  </button>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 h-96 flex flex-col" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💬</span>
                  <h3 className="font-bold text-gray-900 text-lg">Chat Trực Tiếp</h3>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="chat-message">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-blue-600 text-sm">{msg.user}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-800 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    style={{ background: '#f8f9fa' }}
                  />
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Stream Grid View */
          <>
            {/* Live Streams */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #ff4444, #ff6666)' }}></div>
                <h2 className="text-3xl font-bold text-gray-900">Đang Phát Trực Tiếp</h2>
                <div className="w-3 h-3 bg-red-500 rounded-full" style={{ animation: 'pulse 2s infinite' }}></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveStreams
                  .filter((stream) => stream.isLive)
                  .map((stream) => (
                    <div
                      key={stream.id}
                      onClick={() => setSelectedStream(stream)}
                      className="stream-card cursor-pointer"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="stream-image w-full h-48 object-cover"
                        />
                        
                        {/* Live Badge */}
                        <div className="absolute top-3 left-3 live-badge text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          TRỰC TIẾP
                        </div>
                        
                        {/* Viewers */}
                        <div className="absolute top-3 right-3 viewer-count text-xs">
                          {stream.viewers.toLocaleString()} người xem
                        </div>
                        
                        {/* Duration */}
                        <div className="absolute bottom-3 right-3 viewer-count text-xs">
                          {stream.duration}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                          {stream.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{stream.streamer}</p>
                        <div className="flex items-center justify-between">
                          <span className="category-tag">
                            {stream.category}
                          </span>
                          <button className="text-blue-600 text-sm font-bold hover:text-blue-700">
                            Xem Ngay →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Upcoming Streams */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #ff9800, #ffb74d)' }}></div>
                <h2 className="text-3xl font-bold text-gray-900">Sắp Phát Sóng</h2>
                <span className="text-2xl">⏰</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingStreams.map((stream) => (
                  <div key={stream.id} className="stream-card">
                    <div className="relative">
                      <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="w-full h-48 object-cover opacity-90"
                      />
                      
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(45deg, #ff9800, #ffb74d)' }}>
                        Sắp Diễn Ra
                      </div>
                      
                      <div className="absolute bottom-3 right-3 viewer-count text-xs font-bold">
                        {stream.startTime}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">{stream.title}</h3>
                      <p className="text-gray-600 mb-3">{stream.streamer}</p>
                      <div className="flex items-center justify-between">
                        <span className="category-tag">
                          {stream.category}
                        </span>
                        <button className="text-orange-600 text-sm font-bold hover:text-orange-700">
                          🔔 Đặt Nhắc Nhở
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline Streams */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gray-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">Sắp Bắt Đầu</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveStreams
                  .filter((stream) => !stream.isLive)
                  .map((stream) => (
                    <div key={stream.id} className="stream-card">
                      <div className="relative">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-full h-48 object-cover opacity-75"
                        />
                        
                        <div className="absolute top-3 left-3 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Ngoại Tuyến
                        </div>
                        
                        <div className="absolute bottom-3 right-3 viewer-count text-xs font-bold">
                          {stream.duration}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg">{stream.title}</h3>
                        <p className="text-gray-600 mb-3">{stream.streamer}</p>
                        <div className="flex items-center justify-between">
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {stream.category}
                          </span>
                          <button className="text-gray-600 text-sm font-bold hover:text-gray-700">
                            🔔 Đặt Nhắc Nhở
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}