"use client"

import { useState } from "react"
import { Eye, Trash2, Video } from "lucide-react"


const LivestreamsTab = ({ openModal }) => {
  const [livestreams] = useState([
    { id: 1, title: "Flash Sale iPhone 15", viewers: 1250, status: "Đang phát", startTime: "14:00" },
    { id: 2, title: "Review sản phẩm mới", viewers: 850, status: "Đã kết thúc", startTime: "10:00" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý livestream</h2>
        <button
          onClick={() => openModal("create-livestream")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Video size={20} /> Tạo livestream
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Người xem</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Giờ bắt đầu</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {livestreams.map((stream) => (
              <tr key={stream.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{stream.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{stream.title}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{stream.viewers.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      stream.status === "Đang phát" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {stream.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{stream.startTime}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal("livestream-view", { streamId: stream.id.toString() })}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Xem/Quản lý livestream"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors" title="Xóa livestream">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LivestreamsTab
