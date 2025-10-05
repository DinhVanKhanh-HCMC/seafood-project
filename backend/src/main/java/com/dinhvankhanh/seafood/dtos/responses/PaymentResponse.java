package com.dinhvankhanh.seafood.dtos.responses;

import com.dinhvankhanh.seafood.enums.PaymentMethod;
import com.dinhvankhanh.seafood.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private String id;

    private String orderId;         // liên kết tới Order

    private BigDecimal amount;      // số tiền thanh toán

    private PaymentMethod method;
    private PaymentStatus status;
    private LocalDateTime createdAt;
}
