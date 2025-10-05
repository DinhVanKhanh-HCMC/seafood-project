package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.responses.PaymentResponse;
import com.dinhvankhanh.seafood.enums.PaymentMethod;
import com.dinhvankhanh.seafood.enums.PaymentStatus;
import com.dinhvankhanh.seafood.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ApiResource<PaymentResponse> createPayment(String id, PaymentMethod method){
        PaymentResponse response = paymentService.createPayment(id, method);
        return ApiResource.ok(response,"Tạo payment thành công");
    }

    @GetMapping("/{orderId}")
    public ApiResource<PaymentResponse> getPaymentByOrderId(@PathVariable String orderId){
        PaymentResponse response = paymentService.getPaymentByOrder(orderId);
        return ApiResource.ok(response,"SUCCESS");
    }

    @PostMapping("/update-status/{id}")
    public ApiResource<PaymentResponse> updateStatus(@PathVariable String id, PaymentStatus status){
        PaymentResponse response = paymentService.updateStatus(id,status);
        return ApiResource.ok(response,"Cập nhật trạng thái payment thành công");
    }

}
