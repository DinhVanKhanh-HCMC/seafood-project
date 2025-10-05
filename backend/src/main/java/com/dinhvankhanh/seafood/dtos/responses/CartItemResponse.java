package com.dinhvankhanh.seafood.dtos.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {
    private String productId;
    private String name;
    private BigDecimal price;
    private int quantity;
    private BigDecimal subtotal;
    private List<String> images;
    private String origin;
}
