package com.dinhvankhanh.seafood.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidRequest {
    private BigDecimal amount;
    private String userId;
    private String userName;
}
