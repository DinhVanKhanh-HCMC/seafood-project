package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.CreateOrderRequest;
import com.dinhvankhanh.seafood.dtos.responses.OrderResponse;
import com.dinhvankhanh.seafood.enums.OrderStatus;
import com.dinhvankhanh.seafood.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ApiResource<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest createOrderRequest){
        OrderResponse response = orderService.createOrder(createOrderRequest);
        return ApiResource.ok(response,"Tạo đơn hàng thành công");
    }

    @GetMapping("/my-orders")
    public ApiResource<List<OrderResponse>> getMyOrders(){
        List<OrderResponse> response = orderService.getMyOrders();
        return ApiResource.ok(response,"Lấy danh sách order của user login thành công");
    }

    @GetMapping("/{id}")
    public ApiResource<OrderResponse> getOrderById(@PathVariable String id){
        OrderResponse response = orderService.getOrderById(id);
        return ApiResource.ok(response,"Lấy order theo id thành công");
    }

    @PostMapping("/cancel/{id}")
    public ApiResource<OrderResponse> cancelOrder(@PathVariable String id){
        OrderResponse response = orderService.cancelOrder(id);
        return ApiResource.ok(response,"Hủy đơn hàng thành công");
    }

    @GetMapping
    public ApiResource<List<OrderResponse>> getAllOrder(){
        List<OrderResponse> responses = orderService.getAllOrders();
        return ApiResource.ok(responses,"Lấy tất cả đơn hàng thành công");
    }

    @GetMapping("/admin/{id}")
    public ApiResource<OrderResponse> getDetailOrderForAdmin(@PathVariable String id){
        OrderResponse responses = orderService.orderDetailForAdmin(id);
        return ApiResource.ok(responses,"Lấy chi tiết đơn hàng thành công");
    }

    @PostMapping("/update-status/{id}")
    public ApiResource<OrderResponse> updateOrderStatus(@PathVariable String id,@RequestParam OrderStatus status){
        OrderResponse response = orderService.updateOrderStatus(id,status);
        return ApiResource.ok(response,"Cập nhật trạng thái đơn hàng thành công");
    }



}
