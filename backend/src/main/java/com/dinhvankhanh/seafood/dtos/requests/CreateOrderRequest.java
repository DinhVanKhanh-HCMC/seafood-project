package com.dinhvankhanh.seafood.dtos.requests;

import com.dinhvankhanh.seafood.enums.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderRequest {

    @NotBlank(message = "địa chỉ không được để trống")
    private String addressId;

    private PaymentMethod paymentMethod;
}
