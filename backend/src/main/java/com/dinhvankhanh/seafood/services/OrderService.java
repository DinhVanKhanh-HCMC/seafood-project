package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.CreateOrderRequest;
import com.dinhvankhanh.seafood.dtos.responses.OrderResponse;
import com.dinhvankhanh.seafood.enums.OrderStatus;
import com.dinhvankhanh.seafood.models.Order;

import java.util.List;

public interface OrderService {
    public OrderResponse createOrder(CreateOrderRequest createOrderRequest);
    public List<OrderResponse> getMyOrders();
    public OrderResponse getOrderById(String orderId);
    public OrderResponse cancelOrder(String orderId);

    public List<OrderResponse> getAllOrders();

    public OrderResponse updateOrderStatus(String orderId, OrderStatus status);
}
