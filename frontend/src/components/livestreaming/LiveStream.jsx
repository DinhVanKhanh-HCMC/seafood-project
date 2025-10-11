"use client"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./LiveStream.css"
import ViewerView from "./ViewerView"

export default function LivestreamsPage() {
  const navigate = useNavigate()
  const [selectedStream, setSelectedStream] = useState(null)
  const [showViewer, setShowViewer] = useState(false)

  const liveStreams = [
    {
      id: 1,
      title: "Chợ Cá Boston - Đấu Giá Buổi Sáng",
      streamer: "Chợ Hải Cảng Boston",
      viewers: 1247,
      category: "Đấu Giá Trực Tiếp",
      thumbnail: "/boston-fish-market-auction.jpg",
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
      thumbnail: "/chef-preparing-salmon.jpg",
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
      thumbnail: "/maine-lobster-boat.jpg",
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
      thumbnail: "/oyster-farm.png",
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
      thumbnail: "/tuna-cutting-demonstration.jpg",
      category: "Demo Nấu Ăn",
    },
    {
      id: 6,
      title: "Thuyền Tôm Đánh Bắt Trực Tiếp",
      streamer: "Ngư Dân Vịnh Gulf",
      startTime: "4:30 PM EST",
      thumbnail: "/shrimp-boat-fishing.jpg",
      category: "Đánh Bắt Trực Tiếp",
    },
  ]

  const handleWatchStream = (stream) => {
    if (stream.isLive) {
      setSelectedStream(stream)
      setShowViewer(true)
    } else {
      alert(`Stream "${stream.title}" sẽ bắt đầu ${stream.duration}`)
    }
  }

  const closeViewer = () => {
    setShowViewer(false)
    setSelectedStream(null)
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 live-badge text-white px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-sm font-bold">TRỰC TIẾP</span>
          </div>
          <h1 className="text-orange-500 text-5xl font-bold mb-4">Livestream Hải Sản</h1>
          <p className="text-gray-600 text-xl">Xem đấu giá trực tiếp, demo nấu ăn và tham quan chợ hải sản</p>
        </div>

        {/* Live Streams */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: "linear-gradient(to bottom, #ff4444, #ff6666)" }}
            ></div>
            <h2 className="text-3xl font-bold text-gray-900">Đang Phát Trực Tiếp</h2>
            <div className="w-3 h-3 bg-red-500 rounded-full" style={{ animation: "pulse 2s infinite" }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveStreams
              .filter((stream) => stream.isLive)
              .map((stream) => (
                <div
                  key={stream.id}
                  className="stream-card cursor-pointer"
                  onClick={() => handleWatchStream(stream)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
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
                    <div className="absolute bottom-3 right-3 viewer-count text-xs">{stream.duration}</div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{stream.title}</h3>
                    <p className="text-gray-600 mb-3">{stream.streamer}</p>
                    <div className="flex items-center justify-between">
                      <span className="category-tag">{stream.category}</span>
                      <button 
                        className="text-blue-600 text-sm font-bold hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWatchStream(stream)
                        }}
                      >
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
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: "linear-gradient(to bottom, #ff9800, #ffb74d)" }}
            ></div>
            <h2 className="text-3xl font-bold text-gray-900">Sắp Phát Sóng</h2>
            <span className="text-2xl">⏰</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingStreams.map((stream) => (
              <div key={stream.id} className="stream-card">
                <div className="relative">
                  <img
                    src={stream.thumbnail || "/placeholder.svg"}
                    alt={stream.title}
                    className="w-full h-48 object-cover opacity-90"
                  />

                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(45deg, #ff9800, #ffb74d)" }}
                  >
                    Sắp Diễn Ra
                  </div>

                  <div className="absolute bottom-3 right-3 viewer-count text-xs font-bold">{stream.startTime}</div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">{stream.title}</h3>
                  <p className="text-gray-600 mb-3">{stream.streamer}</p>
                  <div className="flex items-center justify-between">
                    <span className="category-tag">{stream.category}</span>
                    <button className="text-orange-600 text-sm font-bold hover:text-orange-700">🔔 Đặt Nhắc Nhở</button>
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
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-48 object-cover opacity-75"
                    />

                    <div className="absolute top-3 left-3 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Ngoại Tuyến
                    </div>

                    <div className="absolute bottom-3 right-3 viewer-count text-xs font-bold">{stream.duration}</div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{stream.title}</h3>
                    <p className="text-gray-600 mb-3">{stream.streamer}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {stream.category}
                      </span>
                      <button className="text-gray-600 text-sm font-bold hover:text-gray-700">🔔 Đặt Nhắc Nhở</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Viewer Modal */}
      {showViewer && selectedStream && (
        <ViewerView 
          closeModal={closeViewer} 
          streamId={selectedStream.id.toString()}
          streamData={selectedStream}
        />
      )}
    </div>
  )
}