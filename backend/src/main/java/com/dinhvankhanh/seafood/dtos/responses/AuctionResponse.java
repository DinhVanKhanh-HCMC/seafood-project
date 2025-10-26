package com.dinhvankhanh.seafood.dtos.responses;

import com.dinhvankhanh.seafood.enums.AuctionStatus;
import com.dinhvankhanh.seafood.models.Bid;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionResponse {
    private String id;
    private String productId;
    private String productName;
    private String productImage;
    private BigDecimal startPrice;
    private BigDecimal currentPrice;
    private BigDecimal bidStep;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AuctionStatus status;
    private String winnerId;
    private String winnerName;
    private List<Bid> bids;
    private Integer participantCount;
    private LocalDateTime createdAt;

}
