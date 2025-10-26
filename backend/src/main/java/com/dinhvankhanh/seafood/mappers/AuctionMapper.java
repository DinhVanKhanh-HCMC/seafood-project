package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.AuctionResponse;
import com.dinhvankhanh.seafood.models.Auction;
import org.springframework.stereotype.Component;


@Component
public class AuctionMapper {
    public AuctionResponse mapperToAuctionResponse(Auction auction){
        return AuctionResponse.builder()
                .id(auction.getId())
                .productId(auction.getProductId())
                .productName(auction.getProductName())
                .productImage(auction.getProductImage())
                .startPrice(auction.getStartPrice())
                .currentPrice(auction.getCurrentPrice())
                .bidStep(auction.getBidStep())
                .startTime(auction.getStartTime())
                .endTime(auction.getEndTime())
                .status(auction.getStatus())
                .winnerId(auction.getWinnerId())
                .winnerName(auction.getWinnerName())
                .bids(auction.getBids())
                .participantCount(auction.getParticipantCount())
                .createdAt(auction.getCreatedAt())
                .build();
    }

}
