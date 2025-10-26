package com.dinhvankhanh.seafood.websocket;

import com.dinhvankhanh.seafood.models.Auction;
import com.dinhvankhanh.seafood.models.Bid;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class AuctionWebSocketHandler extends TextWebSocketHandler {


    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final Map<String, String> sessionAuctions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
        System.out.println("🔌 Auction WebSocket connected: " + session.getId());

        // Gửi message chào mừng
        Map<String, Object> welcomeMsg = Map.of(
                "type", "connected",
                "sessionId", session.getId()
        );
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(welcomeMsg)));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("📨 Received auction message: " + payload);

        try {
            Map<String, Object> messageData = objectMapper.readValue(payload, Map.class);
            String messageType = (String) messageData.get("type");
            String auctionId = (String) messageData.get("auctionId");

            if ("joinAuction".equals(messageType)) {
                sessionAuctions.put(session.getId(), auctionId);
                System.out.println("🎯 Session " + session.getId() + " joined auction: " + auctionId);

                // Gửi xác nhận join thành công
                Map<String, Object> response = Map.of(
                        "type", "joinedAuction",
                        "auctionId", auctionId
                );
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(response)));
            }

        } catch (Exception e) {
            System.out.println("❌ Error processing auction message: " + e.getMessage());

            // Gửi lỗi về client
            Map<String, Object> errorResponse = Map.of(
                    "type", "error",
                    "message", e.getMessage()
            );
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(errorResponse)));
        }
    }

    public void broadcastNewBid(Auction auction, Bid bid) {
        Map<String, Object> message = Map.of(
                "type", "newBid",
                "auctionId", auction.getId(),
                "bid", Map.of(
                        "userName", bid.getUserName(),
                        "amount", bid.getAmount(),
                        "bidTime", bid.getBidTime()
                ),
                "currentPrice", auction.getCurrentPrice(),
                "participantCount", auction.getParticipantCount()
        );

        broadcastToAuction(auction.getId(), message);
    }

    public void broadcastAuctionCreated(Auction auction) {
        Map<String, Object> message = Map.of(
                "type", "auctionCreated",
                "auction", Map.of(
                        "id", auction.getId(),
                        "productName", auction.getProductName(),
                        "startPrice", auction.getStartPrice(),
                        "endTime", auction.getEndTime()
                )
        );

        broadcastToAll(message);
    }

    public void broadcastAuctionStarted(Auction auction) {
        Map<String, Object> message = Map.of(
                "type", "auctionStarted",
                "auctionId", auction.getId()
        );

        broadcastToAuction(auction.getId(), message);
    }

    public void broadcastAuctionEnded(Auction auction) {
        Map<String, Object> message = Map.of(
                "type", "auctionEnded",
                "auctionId", auction.getId(),
                "winnerName", auction.getWinnerName(),
                "finalPrice", auction.getCurrentPrice()
        );

        broadcastToAuction(auction.getId(), message);
    }

    private void broadcastToAuction(String auctionId, Map<String, Object> message) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(message);
            TextMessage textMessage = new TextMessage(jsonMessage);

            sessions.forEach((sessionId, session) -> {
                if (session.isOpen() && auctionId.equals(sessionAuctions.get(sessionId))) {
                    try {
                        session.sendMessage(textMessage);
                        System.out.println("📤 Sent auction message to session: " + sessionId);
                    } catch (Exception e) {
                        System.out.println("❌ Error sending to session " + sessionId + ": " + e.getMessage());
                    }
                }
            });

        } catch (Exception e) {
            System.out.println("❌ Error broadcasting auction message: " + e.getMessage());
        }
    }

    private void broadcastToAll(Map<String, Object> message) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(message);
            TextMessage textMessage = new TextMessage(jsonMessage);

            sessions.forEach((sessionId, session) -> {
                if (session.isOpen()) {
                    try {
                        session.sendMessage(textMessage);
                    } catch (Exception e) {
                        System.out.println("❌ Error sending to session " + sessionId);
                    }
                }
            });

        } catch (Exception e) {
            System.out.println("❌ Error broadcasting to all: " + e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String sessionId = session.getId();
        sessions.remove(sessionId);
        sessionAuctions.remove(sessionId);
        System.out.println("🔌 Auction WebSocket disconnected: " + sessionId);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("❌ Auction transport error for session " + session.getId() + ": " + exception.getMessage());
    }
}
