package com.dinhvankhanh.seafood.config;

import com.dinhvankhanh.seafood.websocket.AuctionWebSocketHandler;
import com.dinhvankhanh.seafood.websocket.SignalingHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final SignalingHandler signalingHandler;
    private final AuctionWebSocketHandler auctionWebSocketHandler;
    public WebSocketConfig(SignalingHandler signalingHandler, AuctionWebSocketHandler auctionWebSocketHandler) {
        this.signalingHandler = signalingHandler;
        this.auctionWebSocketHandler = auctionWebSocketHandler;
    }
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(signalingHandler, "/ws")
                .setAllowedOriginPatterns("*");

        registry.addHandler(auctionWebSocketHandler, "/ws/auctions")
                .setAllowedOriginPatterns("*");
    }
}
