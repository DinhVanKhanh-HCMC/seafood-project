package com.dinhvankhanh.seafood.models;

import com.dinhvankhanh.seafood.enums.PaymentMethod;
import com.dinhvankhanh.seafood.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "payments")
public class Payment {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String orderId;         // liên kết tới Order

    private BigDecimal amount;      // số tiền thanh toán

    private PaymentMethod method;
    private PaymentStatus status;
    private String stripeSessionId;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}

