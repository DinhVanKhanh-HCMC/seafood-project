package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.AuctionRequest;
import com.dinhvankhanh.seafood.dtos.requests.BidRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuctionResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;

import java.util.List;

public interface AuctionService {
    AuctionResponse createAuction(AuctionRequest request);
    AuctionResponse startAuction(String auctionId);
    AuctionResponse placeBid(String auctionId, BidRequest request);
    AuctionResponse endAuction(String auctionId);
    List<AuctionResponse> getActiveAuctions();
    List<AuctionResponse> getAllAuctions();
    AuctionResponse getAuctionById(String id);
    void endExpiredAuctions();
    public void startScheduledAuctions();
    UserResponse getAuctionWinner(String id);
}
