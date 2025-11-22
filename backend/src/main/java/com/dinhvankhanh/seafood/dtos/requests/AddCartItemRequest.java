package com.dinhvankhanh.seafood.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCartItemRequest {
    private String productId;
    private int quantity;
    private BigDecimal auctionPrice; // nếu là sản phẩm đấu giá
    private boolean isAuctionItem;
}
