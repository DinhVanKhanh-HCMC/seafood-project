package com.dinhvankhanh.seafood.dtos.requests;

import lombok.Data;

@Data
public class OtpVerificationRequest {
    private String email;
    private String otp;
}
