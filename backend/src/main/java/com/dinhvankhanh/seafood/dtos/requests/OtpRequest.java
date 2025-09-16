package com.dinhvankhanh.seafood.dtos.requests;

import lombok.Data;

@Data
public class OtpRequest {
    private String email;
    private String mode;
}