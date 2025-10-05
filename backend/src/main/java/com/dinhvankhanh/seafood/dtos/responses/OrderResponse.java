package com.dinhvankhanh.seafood.dtos.responses;

import com.dinhvankhanh.seafood.enums.OrderStatus;
import com.dinhvankhanh.seafood.models.CartItem;
import com.dinhvankhanh.seafood.models.OrderProduct;
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
public class OrderResponse {

    private String id;

    private String userId;

    private List<OrderProduct> items; // tái sử dụng từ Cart
    private BigDecimal totalPrice;
    private OrderStatus status; // PENDING, PAID, SHIPPED, COMPLETED, CANCELED

    private LocalDateTime createdAt;
}
