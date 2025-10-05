package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.responses.PaymentResponse;
import com.dinhvankhanh.seafood.enums.PaymentMethod;
import com.dinhvankhanh.seafood.enums.PaymentStatus;

public interface PaymentService {
    public PaymentResponse createPayment(String orderId, PaymentMethod method);
    public PaymentResponse getPaymentByOrder(String orderId);
    public PaymentResponse updateStatus(String paymentId, PaymentStatus status);
}
