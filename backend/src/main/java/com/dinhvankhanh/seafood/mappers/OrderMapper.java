package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.OrderResponse;
import com.dinhvankhanh.seafood.enums.PaymentMethod;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.models.Order;
import com.dinhvankhanh.seafood.models.Payment;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.PaymentRepository;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    public OrderResponse mapperToOrderResponse(Order order){
        String paymentMethod;

        if(order.getPaymentMethod() != null && order.getPaymentMethod().equals(PaymentMethod.CARD)){
            paymentMethod = "Tín dụng";
        }else{
            paymentMethod = "Tiền mặt";
        }

        User user = userRepository.findById(order.getUserId())
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));


        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalPrice(order.getTotalPrice())
                .items(order.getItems())
                .orderNumber(order.getOrderNumber())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .paymentMethod(paymentMethod)
                .address(order.getAddress())
                .customer(user.getFullName())
                .phoneNumber(order.getPhoneNumber())
                .build();
    }
}
