package com.dinhvankhanh.seafood.websocket;

import com.dinhvankhanh.seafood.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class SignalingHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final Map<String, String> sessionRoles = new ConcurrentHashMap<>();
    private String streamerSessionId = null;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final UserService userService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
        System.out.println("🔌 New WebSocket connection: " + session.getId());

        if (streamerSessionId != null && !sessions.containsKey(streamerSessionId)) {
            System.out.println("🔄 Streamer session expired, resetting...");
            streamerSessionId = null;
            sessionRoles.clear();
        }

        Map<String, Object> response = new HashMap<>();

        if (streamerSessionId == null) {
            // Người đầu tiên là streamer
            streamerSessionId = session.getId();
            sessionRoles.put(session.getId(), "streamer");
            response.put("type", "role");
            response.put("role", "streamer");
            System.out.println("🎥 Streamer connected: " + session.getId());
        } else {
            // Các kết nối sau là viewer
            sessionRoles.put(session.getId(), "viewer");
            response.put("type", "role");
            response.put("role", "viewer");
            response.put("viewerId", session.getId()); // GỬI ID RIÊNG CHO VIEWER
            System.out.println("👀 Viewer connected: " + session.getId());

            // Gửi thông báo chính xác cho streamer
            notifyStreamerAboutViewer(session.getId());
        }

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(response)));
    }


    private void notifyStreamerAboutViewer(String viewerId) throws Exception {
        if (streamerSessionId == null) return;

        WebSocketSession streamerSession = sessions.get(streamerSessionId);
        if (streamerSession == null || !streamerSession.isOpen()) return;

        Map<String, Object> notification = new HashMap<>();
        notification.put("type", "viewerJoined");
        notification.put("viewerId", viewerId); // ID CHÍNH XÁC
        notification.put("viewerCount", sessions.size() - 1);

        streamerSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(notification)));
        System.out.println("📢 Notified streamer about new viewer: " + viewerId);
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("📨 Received message from " + session.getId() + " (" + sessionRoles.get(session.getId()) + "): " + payload);

        try {
            Map<String, Object> messageData = objectMapper.readValue(payload, Map.class);
            String messageType = (String) messageData.get("type");

            // Xử lý message dựa trên type và role
            if ("offer".equals(messageType)) {
                handleOffer(session, messageData);
            } else if ("answer".equals(messageType)) {
                handleAnswer(session, messageData);
            } else if ("candidate".equals(messageType)) {
                handleCandidate(session, messageData);
            } else {
                // Broadcast message thông thường
                broadcastMessage(session, message);
            }

        } catch (Exception e) {
            System.out.println("❌ Error parsing message: " + e.getMessage());
            // Vẫn broadcast message raw nếu không parse được
            broadcastMessage(session, message);
        }
    }

    private void handleOffer(WebSocketSession sender, Map<String, Object> offer) throws Exception {
        System.out.println("🎯 Handling offer from streamer");

        // LẤY TARGET VIEWER ID TỪ MESSAGE
        String targetViewerId = (String) offer.get("viewerId");

        if (targetViewerId != null) {
            // GỬI CHO VIEWER CỤ THỂ
            WebSocketSession viewerSession = sessions.get(targetViewerId);
            if (viewerSession != null && viewerSession.isOpen() && "viewer".equals(sessionRoles.get(targetViewerId))) {
                String jsonOffer = objectMapper.writeValueAsString(offer);
                viewerSession.sendMessage(new TextMessage(jsonOffer));
                System.out.println("📤 Forwarded offer to specific viewer: " + targetViewerId);
            } else {
                System.out.println("❌ Target viewer not found or not a viewer: " + targetViewerId);
            }
        } else {
            System.out.println("❌ No viewerId specified in offer, broadcasting to all viewers");
            // Fallback: gửi cho tất cả viewer (giữ logic cũ)
            for (WebSocketSession session : sessions.values()) {
                if (session.isOpen() && !session.getId().equals(sender.getId())) {
                    String role = sessionRoles.get(session.getId());
                    if ("viewer".equals(role)) {
                        String jsonOffer = objectMapper.writeValueAsString(offer);
                        session.sendMessage(new TextMessage(jsonOffer));
                        System.out.println("📤 Forwarded offer to viewer: " + session.getId());
                    }
                }
            }
        }
    }

    private void handleAnswer(WebSocketSession sender, Map<String, Object> answer) throws Exception {
        System.out.println("🎯 Handling answer from viewer: " + sender.getId());

        // THÊM VIEWER ID VÀO ANSWER ĐỂ STREAMER BIẾT
        answer.put("viewerId", sender.getId());

        // Gửi answer cho streamer
        if (streamerSessionId != null) {
            WebSocketSession streamerSession = sessions.get(streamerSessionId);
            if (streamerSession != null && streamerSession.isOpen()) {
                String jsonAnswer = objectMapper.writeValueAsString(answer);
                streamerSession.sendMessage(new TextMessage(jsonAnswer));
                System.out.println("📤 Forwarded answer to streamer from viewer: " + sender.getId());
            }
        }
    }

    private void handleCandidate(WebSocketSession sender, Map<String, Object> candidate) throws Exception {
        System.out.println("🎯 Handling ICE candidate from: " + sender.getId());

        String senderRole = sessionRoles.get(sender.getId());
        String targetId = (String) candidate.get("viewerId");

        if (targetId != null) {
            // GỬI CANDIDATE ĐẾN TARGET CỤ THỂ
            WebSocketSession targetSession = sessions.get(targetId);
            if (targetSession != null && targetSession.isOpen()) {
                String jsonCandidate = objectMapper.writeValueAsString(candidate);
                targetSession.sendMessage(new TextMessage(jsonCandidate));
                System.out.println("📤 Forwarded candidate to specific target: " + targetId);
            }
        } else {
            // FALLBACK: GỬI THEO ROLE (giữ logic cũ)
            System.out.println("❌ No target specified for candidate, using role-based forwarding");
            for (WebSocketSession session : sessions.values()) {
                if (session.isOpen() && !session.getId().equals(sender.getId())) {
                    String receiverRole = sessionRoles.get(session.getId());

                    // Streamer gửi candidate cho viewer và ngược lại
                    if (("streamer".equals(senderRole) && "viewer".equals(receiverRole)) ||
                            ("viewer".equals(senderRole) && "streamer".equals(receiverRole))) {

                        String jsonCandidate = objectMapper.writeValueAsString(candidate);
                        session.sendMessage(new TextMessage(jsonCandidate));
                        System.out.println("📤 Forwarded candidate from " + senderRole + " to " + receiverRole);
                    }
                }
            }
        }
    }

    private void broadcastMessage(WebSocketSession sender, TextMessage message) throws Exception {
        // Broadcast message cho tất cả client khác
        for (WebSocketSession session : sessions.values()) {
            if (session.isOpen() && !session.getId().equals(sender.getId())) {
                session.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String sessionId = session.getId();
        String role = sessionRoles.get(sessionId);

        sessions.remove(sessionId);
        sessionRoles.remove(sessionId);

        if (sessionId.equals(streamerSessionId)) {
            System.out.println("🎥 Streamer disconnected: " + sessionId);
            streamerSessionId = null;

            // Thông báo cho tất cả viewer biết stream đã kết thúc
            Map<String, Object> endMessage = new HashMap<>();
            endMessage.put("type", "streamEnded");

            String jsonEndMessage = objectMapper.writeValueAsString(endMessage);
            for (WebSocketSession s : sessions.values()) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonEndMessage));
                }
            }
            System.out.println("📢 Notified all viewers about stream end");
        } else {
            System.out.println("❌ " + role + " disconnected: " + sessionId);
        }

        System.out.println("📊 Remaining connections: " + sessions.size());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("❌ Transport error for session " + session.getId() + ": " + exception.getMessage());
    }
}