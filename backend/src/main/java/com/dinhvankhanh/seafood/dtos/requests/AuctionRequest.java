package com.dinhvankhanh.seafood.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionRequest {
    private String productId;
    private BigDecimal startPrice;
    private BigDecimal bidStep;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
