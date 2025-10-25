package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderProduct {
    private String productId;
    private String name;       // snapshot tên
    private BigDecimal price;  // snapshot giá
    private int quantity;
    private String image;
    private String origin;
    private String weight;
}
