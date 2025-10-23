package com.dinhvankhanh.seafood.dtos.requests;

import com.dinhvankhanh.seafood.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaceOrderRequest {
    private String addressId;
    private PaymentMethod paymentMethod;
    private String note;
}
