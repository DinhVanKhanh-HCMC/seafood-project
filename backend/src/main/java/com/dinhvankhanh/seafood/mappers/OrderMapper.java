package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.OrderResponse;
import com.dinhvankhanh.seafood.models.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
    public OrderResponse mapperToOrderResponse(Order order){
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalPrice(order.getTotalPrice())
                .items(order.getItems())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .build();
    }
}
