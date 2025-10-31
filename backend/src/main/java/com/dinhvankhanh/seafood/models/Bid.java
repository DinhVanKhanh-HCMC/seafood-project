package com.dinhvankhanh.seafood.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bid {
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String userId;
    private String userName;
    private BigDecimal amount;

    private LocalDateTime bidTime;
}
