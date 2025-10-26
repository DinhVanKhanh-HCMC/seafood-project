"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

const CreateLivestream = ({ openModal, closeModal }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const navigate = useNavigate();

  const startLive = () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề livestream")
      return
    }

    // Generate a unique stream ID based on timestamp
    const streamId = Date.now().toString()

    console.log("[v0] Creating livestream with ID:", streamId)

    // Close create modal and open streamer view with the stream ID
    navigate("/livestream-view")
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Tạo livestream mới</h3>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tiêu đề livestream..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Nhập mô tả..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian bắt đầu</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={startLive}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors font-medium"
          >
            Bắt đầu phát trực tiếp
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors font-medium"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateLivestream
