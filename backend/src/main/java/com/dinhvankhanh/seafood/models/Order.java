package com.dinhvankhanh.seafood.models;

import com.dinhvankhanh.seafood.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "orders")
public class Order {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String userId;

    private List<OrderProduct> items; // tái sử dụng từ Cart
    private BigDecimal totalPrice;
    private OrderStatus status; // PENDING, PAID, SHIPPED, COMPLETED, CANCELED

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
