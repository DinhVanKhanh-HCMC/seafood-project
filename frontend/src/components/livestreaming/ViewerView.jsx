"use client"

import { useState, useEffect, useRef } from "react"
import { X, MessageCircle, Eye, User, Share, Heart } from "lucide-react"

const ViewerView = ({ closeModal, streamId = "1", streamData = null }) => {
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [livestreamActive, setLivestreamActive] = useState(false)
  const [livestreamViews, setLivestreamViews] = useState(streamData?.viewers || 0)
  const [connectionStatus, setConnectionStatus] = useState("disconnected")
  const [waitingForStream, setWaitingForStream] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(streamData?.likes || 0)

  const remoteVideoRef = useRef(null)
  const ws = useRef(null)
  const pc = useRef(null)
  const viewerId = useRef(`viewer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const currentStreamId = useRef(streamId)

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
  }

  useEffect(() => {
    currentStreamId.current = streamId
    console.log(`[v0] Viewer joining stream: ${streamId}`)
    connectWebSocket()
    return cleanup
  }, [streamId])

  const connectWebSocket = () => {
    console.log("[v0] Connecting to WebSocket as VIEWER...")
    const socket = new WebSocket("ws://localhost:8080/ws")

    socket.onopen = () => {
      console.log("[v0] ✅ Viewer connected to signaling server")
      setConnectionStatus("connected")
      ws.current = socket

      // The backend will send us a "role" message and notify the streamer about us
      console.log(`[v0] Waiting for role assignment and connection to stream: ${currentStreamId.current}`)
    }

    socket.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data)
        console.log("📨 Viewer received:", msg)

        if (msg.type === "role") {
          console.log(`[v0] 🎭 Backend assigned role: ${msg.role}`)
          if (msg.role !== "viewer") {
            console.error("[v0] ❌ ERROR: This connection was assigned as streamer, not viewer!")
          }
          return
        }

        if (msg.type === "offer") {
          if (msg.streamId && msg.streamId !== currentStreamId.current) {
            console.log(`⏭️ Ignoring offer from different stream: ${msg.streamId}`)
            return
          }
          console.log("📥 Received offer from streamer")
          await handleOffer(msg)
          return
        }

        if (msg.type === "candidate") {
          if (msg.streamId && msg.streamId !== currentStreamId.current) {
            console.log(`⏭️ Ignoring candidate from different stream: ${msg.streamId}`)
            return
          }
          console.log("📥 Received ICE candidate from streamer")
          if (pc.current && msg.candidate) {
            await pc.current.addIceCandidate(new RTCIceCandidate(msg.candidate))
          }
          return
        }

        if (msg.type === "streamEnded") {
          if (msg.streamId && msg.streamId !== currentStreamId.current) {
            return
          }
          console.log("📺 Stream ended by streamer")
          handleStreamEnded()
          return
        }

        if (msg.type === "chat") {
          if ((!msg.streamId || msg.streamId === currentStreamId.current) && msg.chatMessage) {
            setChatMessages((prev) => {
              // Check if message already exists
              if (prev.some((m) => m.id === msg.chatMessage.id)) {
                return prev
              }
              return [...prev, msg.chatMessage]
            })
          }
          return
        }

        if (msg.type === "viewerCount") {
          setLivestreamViews(msg.count)
          return
        }

        if (msg.type === "streamStarted") {
          if (msg.streamId && msg.streamId !== currentStreamId.current) {
            return
          }
          console.log("🎬 Stream started, waiting for offer...")
          // Keep waiting for the offer, don't change waitingForStream here
          return
        }
      } catch (err) {
        console.error("❌ Error handling message:", err)
      }
    }

    socket.onerror = (err) => {
      console.error("❌ WS error:", err)
      setConnectionStatus("error")
    }

    socket.onclose = () => {
      console.log("🔌 WS closed")
      setConnectionStatus("disconnected")
    }
  }

  const handleOffer = async (offerMsg) => {
    try {
      console.log("[v0] Handling offer from streamer")
      if (!pc.current) {
        pc.current = new RTCPeerConnection(iceServers)

        pc.current.ontrack = (event) => {
          console.log("🎬 Received remote stream", event.streams)
          if (remoteVideoRef.current && event.streams[0]) {
            remoteVideoRef.current.srcObject = event.streams[0]
            remoteVideoRef.current.play().catch((err) => {
              console.warn("⚠️ Could not auto-play:", err)
            })
            setLivestreamActive(true)
            setWaitingForStream(false)
            console.log("[v0] Video stream connected successfully!")
          }
        }

        pc.current.onicecandidate = (event) => {
          if (event.candidate && ws.current?.readyState === WebSocket.OPEN) {
            console.log("📤 Sending ICE candidate to streamer")
            ws.current.send(
              JSON.stringify({
                type: "candidate",
                candidate: event.candidate,
                viewerId: viewerId.current,
                streamId: currentStreamId.current,
              }),
            )
          }
        }

        pc.current.onconnectionstatechange = () => {
          console.log(`🔗 Connection state: ${pc.current.connectionState}`)
          if (pc.current.connectionState === "connected") {
            console.log("✅ Peer connection established!")
          } else if (pc.current.connectionState === "failed" || pc.current.connectionState === "disconnected") {
            console.log("❌ Connection failed or disconnected")
            setLivestreamActive(false)
            setWaitingForStream(true)
          }
        }
      }

      const offerDesc = new RTCSessionDescription({
        type: offerMsg.type,
        sdp: offerMsg.sdp,
      })

      await pc.current.setRemoteDescription(offerDesc)
      console.log("✅ Set remote description from offer")

      const answer = await pc.current.createAnswer()
      await pc.current.setLocalDescription(answer)

      ws.current.send(
        JSON.stringify({
          type: "answer",
          sdp: answer.sdp,
          viewerId: viewerId.current,
          streamId: currentStreamId.current,
        }),
      )
      console.log("📤 Sent answer to streamer")
    } catch (err) {
      console.error("❌ Error handling offer:", err)
    }
  }

  const handleStreamEnded = () => {
    console.log("📺 Handling stream end")
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }
    if (pc.current) {
      pc.current.close()
      pc.current = null
    }
    setLivestreamActive(false)
    setWaitingForStream(true)
    alert("Stream đã kết thúc")
  }

  const cleanup = () => {
    console.log("🧹 Cleaning up viewer...")
    if (pc.current) {
      pc.current.close()
      pc.current = null
    }
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "viewerLeave",
          viewerId: viewerId.current,
          streamId: currentStreamId.current,
        }),
      )
      ws.current.close()
      ws.current = null
    }
  }

  const sendMessage = () => {
    if (newMessage.trim() && ws.current?.readyState === WebSocket.OPEN) {
      const chatMsg = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user: "Viewer",
        message: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        viewerId: viewerId.current,
      }
      console.log("[v0] Sending chat message:", chatMsg)
      ws.current.send(
        JSON.stringify({
          type: "chat",
          chatMessage: chatMsg,
          streamId: currentStreamId.current,
        }),
      )
      setNewMessage("")
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "like",
          streamId: currentStreamId.current,
          viewerId: viewerId.current,
          action: isLiked ? "unlike" : "like",
        }),
      )
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: streamData?.title || "Livestream Hải Sản",
        text: streamData?.description || "Đang xem livestream hải sản trực tiếp",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Đã sao chép link vào clipboard!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex">
        <div className="flex-1 relative bg-gray-900">
          <div className="absolute top-4 left-4 z-10 flex gap-4 flex-wrap">
            <button
              onClick={closeModal}
              className="bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-all"
            >
              <X size={24} />
            </button>

            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${livestreamActive ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}
              ></div>
              <span>{livestreamActive ? "ĐANG PHÁT TRỰC TIẾP" : "ĐANG TẮT"}</span>
            </div>

            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Eye size={18} />
              <span>{livestreamViews} người xem</span>
            </div>

            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <span>Kết nối: {connectionStatus}</span>
            </div>

            <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
              <span>👀 VIEWER (Stream: {currentStreamId.current})</span>
            </div>
          </div>

          {streamData && (
            <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-md">
              <h2 className="font-bold text-lg mb-2">{streamData.title}</h2>
              <p className="text-sm text-gray-300 mb-1">{streamData.streamer}</p>
              <p className="text-xs text-gray-400">{streamData.description}</p>
            </div>
          )}

          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-contain" />

          {waitingForStream && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xl">Đang kết nối với stream...</p>
                <p className="text-sm text-gray-400 mt-2">Stream ID: {currentStreamId.current}</p>
                <p className="text-sm text-gray-400 mt-1">Viewer ID: {viewerId.current}</p>
                {!livestreamActive && <p className="text-sm text-gray-400 mt-1">(Streamer có thể chưa bắt đầu phát)</p>}
              </div>
            </div>
          )}

          <div className="absolute bottom-6 right-6 flex gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isLiked ? "bg-red-500 text-white" : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all flex items-center gap-2"
            >
              <Share size={20} />
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>

        <div className="w-96 bg-white flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MessageCircle size={20} /> Chat trực tiếp
            </h3>
            <p className="text-sm text-gray-600">{chatMessages.length} tin nhắn</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-25">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`font-medium text-sm flex items-center gap-1 ${
                      msg.user === "Streamer" ? "text-blue-600" : "text-green-600"
                    }`}
                  >
                    <User size={12} />
                    {msg.user}
                    {msg.user === "Streamer" && " 👑"}
                  </span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-800">{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={ws.current?.readyState !== WebSocket.OPEN}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={ws.current?.readyState !== WebSocket.OPEN}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewerView
