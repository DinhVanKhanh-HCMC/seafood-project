package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.OtpRequest;
import com.dinhvankhanh.seafood.dtos.requests.OtpVerificationRequest;
import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.services.Impl.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send")
    public ApiResource<Map<String,String>> sendOtp(@RequestBody @Valid OtpRequest request) {
        Map<String,String> sent = otpService.sendOtp(request.getEmail(),request.getMode());
        return ApiResource.ok(sent,"SUCCESS");
    }

    @PostMapping("/verify")
    public ApiResource<Map<String,String>> verifyOtp(@RequestBody @Valid OtpVerificationRequest request) {
        boolean isValid = otpService.verifyOtp(request.getEmail(), request.getOtp());
        Map<String,String> data = new HashMap<>();
        data.put("otp",request.getOtp());
        data.put("status",isValid ? "OK" : "FAIL");
        return ApiResource.ok(data, "Xác thực OTP thành công");
    }
}
