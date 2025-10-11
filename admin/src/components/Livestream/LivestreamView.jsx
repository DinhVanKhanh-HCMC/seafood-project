"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause, MessageCircle, Eye } from "lucide-react"



const StreamerView = ({ closeModal, streamId = "1", title, description }) => {
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [livestreamActive, setLivestreamActive] = useState(false)
  const [livestreamViews, setLivestreamViews] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState("disconnected")
  const [myRole, setMyRole] = useState(null);

  const localVideoRef = useRef(null)
  const ws = useRef(null)
  const peerConnections = useRef(new Map())
  const localStream = useRef(null)
  const pendingViewers = useRef(new Set())
  const currentStreamId = useRef(streamId)
  const hasConnected = useRef(false)

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
  }

  useEffect(() => {
    currentStreamId.current = streamId
    if (!hasConnected.current) {
      hasConnected.current = true
      connectWebSocket()
    }
    return () => {
      console.log("[v0] Cleaning up streamer...")
      cleanup()
    }
  }, [])

  useEffect(() => {
    if (livestreamActive && pendingViewers.current.size > 0) {
      console.log(`[v1] Livestream is now active — processing ${pendingViewers.current.size} pending viewers`);
      for (const viewerId of pendingViewers.current) {
        createOfferForViewer(viewerId);
      }
      pendingViewers.current.clear();
    }
  }, [livestreamActive]);


  const connectWebSocket = () => {
    console.log("[v0] Connecting to WebSocket as STREAMER...")
    const socket = new WebSocket("ws://localhost:8080/ws")

    socket.onopen = () => {
      console.log("[v0] ✅ Connected to signaling server")
      setConnectionStatus("connected")
      ws.current = socket
      // The first connection becomes streamer, subsequent ones become viewers
    }

    socket.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data)
        console.log("[v0] 📨 Streamer received:", msg)

        if (msg.type === "role") {
          console.log(`[v0] 🎭 Backend assigned role: ${msg.role}`)
          setMyRole(msg.role)
          if (msg.role !== "streamer") {
            console.error("[v0] ❌ ERROR: This connection was assigned as viewer, not streamer!")
            alert("Lỗi: Kết nối không được nhận dạng là streamer. Vui lòng thử lại.")
          }
          return
        }

        if (msg.type === "viewerJoined") {
          if (msg.streamId && msg.streamId !== currentStreamId.current) {
            console.log(`[v0] ⏭️ Ignoring viewer from different stream: ${msg.streamId}`)
            return
          }

          console.log("[v0] 👋 New viewer joined:", msg.viewerId)
          setLivestreamViews((prev) => prev + 1)

          console.log("[DEBUG] livestreamActive:", livestreamActive);
          console.log("[DEBUG] localStream.current:", localStream.current);
          if (localStream.current) {
            await createOfferForViewer(msg.viewerId)
          } else {
            console.log("[v0] ⏳ Stream not active, adding viewer to pending list")
            pendingViewers.current.add(msg.viewerId)
          }
          return
        }

        if (msg.type === "viewerLeft") {
          console.log("[v0] 👋 Viewer left:", msg.viewerId)
          setLivestreamViews((prev) => Math.max(0, prev - 1))

          const pc = peerConnections.current.get(msg.viewerId)
          if (pc) {
            pc.close()
            peerConnections.current.delete(msg.viewerId)
          }
          pendingViewers.current.delete(msg.viewerId)
          return
        }

        if (msg.type === "answer") {
          console.log("[v0] 📥 Received answer from viewer:", msg.viewerId)
          const pc = peerConnections.current.get(msg.viewerId)
          if (pc && msg.sdp) {
            const answerDesc = new RTCSessionDescription({
              type: msg.type,
              sdp: msg.sdp,
            })
            await pc.setRemoteDescription(answerDesc)
            console.log("[v0] ✅ Set remote description for viewer:", msg.viewerId)
          } else {
            console.error("[v0] ❌ No peer connection found for viewer:", msg.viewerId)
          }
          return
        }

        if (msg.type === "candidate") {
          console.log("[v0] 📥 Received ICE candidate from viewer:", msg.viewerId)
          const pc = peerConnections.current.get(msg.viewerId)
          if (pc && msg.candidate) {
            await pc.addIceCandidate(new RTCIceCandidate(msg.candidate))
            console.log("[v0] ✅ Added ICE candidate for viewer:", msg.viewerId)
          }
          return
        }

        if (msg.type === "chat") {
          if (!msg.streamId || msg.streamId === currentStreamId.current) {
            setChatMessages((prev) => {
              if (prev.some((m) => m.id === msg.chatMessage.id)) {
                return prev
              }
              return [...prev, msg.chatMessage]
            })
          }
          return
        }
      } catch (err) {
        console.error("[v0] ❌ Error handling message:", err)
      }
    }

    socket.onerror = (err) => {
      console.error("[v0] ❌ WS error:", err)
      setConnectionStatus("error")
    }

    socket.onclose = () => {
      console.log("[v0] 🔌 WS closed")
      setConnectionStatus("disconnected")
      hasConnected.current = false
    }
  }

  const createOfferForViewer = async (viewerId) => {
    try {
      console.log("[v0] 🎯 Creating offer for viewer:", viewerId)

      const pc = new RTCPeerConnection(iceServers)
      peerConnections.current.set(viewerId, pc)

      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStream.current)
        })
        console.log("[v0] 📹 Added local tracks to peer connection")
      } else {
        console.error("[v0] ❌ No local stream available")
        return
      }

      pc.onicecandidate = (event) => {
        if (event.candidate && ws.current?.readyState === WebSocket.OPEN) {
          console.log("[v0] 📤 Sending ICE candidate to viewer:", viewerId)
          ws.current.send(
            JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
              viewerId: viewerId,
              streamId: currentStreamId.current,
            }),
          )
        }
      }

      pc.onconnectionstatechange = () => {
        console.log(`[v0] 🔗 Connection state with viewer ${viewerId}: ${pc.connectionState}`)
        if (pc.connectionState === "connected") {
          console.log("[v0] ✅ Successfully connected to viewer:", viewerId)
        } else if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
          console.log("[v0] ❌ Connection failed/disconnected with viewer:", viewerId)
          peerConnections.current.delete(viewerId)
          setLivestreamViews((prev) => Math.max(0, prev - 1))
        }
      }

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      ws.current.send(
        JSON.stringify({
          type: "offer",
          sdp: offer.sdp,
          viewerId: viewerId,
          streamId: currentStreamId.current,
        }),
      )
      console.log("[v0] 📤 Sent offer to viewer:", viewerId)
    } catch (err) {
      console.error("[v0] ❌ Error creating offer for viewer:", err)
    }
  }

  const startLivestream = async () => {
    try {
      console.log("[v0] 🎥 Starting livestream...")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          frameRate: 30,
        },
        audio: true,
      })

      localStream.current = stream

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
        localVideoRef.current.muted = true
        await localVideoRef.current.play()
      }

      setLivestreamActive(true)
      console.log("[v0] ✅ Livestream started")

      if (pendingViewers.current.size > 0 && livestreamActive) {
        console.log(`[v0] 🎯 Creating offers for ${pendingViewers.current.size} pending viewers`)
        for (const viewerId of pendingViewers.current) {
          await createOfferForViewer(viewerId)
        }
        pendingViewers.current.clear()
      }

      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "streamStarted",
            streamId: currentStreamId.current,
          }),
        )
      }
    } catch (err) {
      console.error("[v0] ❌ Error starting livestream:", err)
      alert("Không thể truy cập camera/microphone. Vui lòng kiểm tra quyền truy cập.")
    }
  }

  const stopLivestream = () => {
    console.log("[v0] 🛑 Stopping livestream")

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop())
      localStream.current = null
    }

    peerConnections.current.forEach((pc) => pc.close())
    peerConnections.current.clear()
    pendingViewers.current.clear()

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }

    setLivestreamActive(false)
    setLivestreamViews(0)

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "streamEnded",
          streamId: currentStreamId.current,
        }),
      )
    }
  }

  const cleanup = () => {
    stopLivestream()
    if (ws.current) {
      ws.current.close()
      ws.current = null
    }
  }

  const sendMessage = () => {
    if (newMessage.trim() && ws.current?.readyState === WebSocket.OPEN) {
      const chatMsg = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user: "Streamer",
        message: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      }
      ws.current.send(
        JSON.stringify({
          type: "chat",
          chatMessage: chatMsg,
          streamId: currentStreamId.current,
        }),
      )
      setChatMessages((prev) => [...prev, chatMsg])
      setNewMessage("")
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
              <span>
                WS: {connectionStatus} {myRole && `(${myRole})`}
              </span>
            </div>

            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              <span>🎥 STREAMER (ID: {currentStreamId.current})</span>
            </div>
          </div>

          {title && (
            <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-md">
              <h2 className="font-bold text-lg">{title}</h2>
              {description && <p className="text-sm text-gray-300 mt-1">{description}</p>}
            </div>
          )}

          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-contain" />

          {!livestreamActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-xl">Nhấn "BẮT ĐẦU STREAM" để phát trực tiếp</p>
                <p className="text-sm text-gray-400 mt-2">Stream ID: {currentStreamId.current}</p>
                {myRole && <p className="text-sm text-gray-400 mt-1">Role: {myRole}</p>}
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={livestreamActive ? stopLivestream : startLivestream}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                livestreamActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white font-semibold transition-colors`}
            >
              {livestreamActive ? <Pause size={20} /> : <Play size={20} />}
              {livestreamActive ? "DỪNG STREAM" : "BẮT ĐẦU STREAM"}
            </button>
          </div>
        </div>

        <div className="w-80 bg-white flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MessageCircle size={20} /> Chat trực tiếp
            </h3>
            <p className="text-sm text-gray-600">{chatMessages.length} tin nhắn</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`font-medium text-sm ${msg.user === "Streamer" ? "text-blue-600" : "text-green-600"}`}
                  >
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-800">{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
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

export default StreamerView
