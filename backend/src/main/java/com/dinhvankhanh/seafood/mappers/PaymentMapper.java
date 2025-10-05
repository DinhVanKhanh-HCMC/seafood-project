package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.PaymentResponse;
import com.dinhvankhanh.seafood.models.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    public PaymentResponse mapperToPaymentResponse(Payment payment){
        return PaymentResponse.builder()
                .id(payment.getId())
                .orderId(payment.getOrderId())
                .amount(payment.getAmount())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}
