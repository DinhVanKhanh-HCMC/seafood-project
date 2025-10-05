package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.responses.OrderResponse;
import com.dinhvankhanh.seafood.enums.OrderStatus;
import com.dinhvankhanh.seafood.enums.UserRole;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.OrderMapper;
import com.dinhvankhanh.seafood.models.*;
import com.dinhvankhanh.seafood.repositories.CartRepository;
import com.dinhvankhanh.seafood.repositories.OrderRepository;
import com.dinhvankhanh.seafood.repositories.ProductRepository;
import com.dinhvankhanh.seafood.services.OrderService;
import com.dinhvankhanh.seafood.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserService userService;

    private final ProductRepository productRepository;

    private final OrderMapper orderMapper;


    @Override
    public OrderResponse createOrder() {
        User user = userService.getUserLogin();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ErrorException(ErrorCode.CART_NOT_FOUND));

        if (cart.getItems().isEmpty()) {
            throw new ErrorException(ErrorCode.CART_IS_EMPTY);
        }

        List<OrderProduct> orderProducts = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND));

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);

            orderProducts.add(OrderProduct.builder()
                    .productId(product.getId())
                    .name(product.getName())
                    .price(product.getPrice())
                    .quantity(cartItem.getQuantity())
                    .build());
        }

        Order order = Order.builder()
                .userId(user.getId())
                .items(orderProducts)
                .totalPrice(totalPrice)
                .status(OrderStatus.PENDING)
                .build();

        orderRepository.save(order);


        return orderMapper.mapperToOrderResponse(order);
    }

    @Override
    public List<OrderResponse> getMyOrders() {
        User user = userService.getUserLogin();
        List<Order> myOrders = orderRepository.findByUserId(user.getId());
        return myOrders.stream()
                .map(order -> {
                    return orderMapper.mapperToOrderResponse(order);
                })
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getOrderById(String orderId) {
        User user = userService.getUserLogin();
        Order orderById =  orderRepository.findById(orderId)
                .filter(order -> order.getUserId().equals(user.getId()))
                .orElseThrow(() -> new ErrorException(ErrorCode.ORDER_NOT_FOUND));
        return orderMapper.mapperToOrderResponse(orderById);
    }

    @Override
    public OrderResponse cancelOrder(String orderId) {
        User user = userService.getUserLogin();
        Order order = orderRepository.findById(orderId)
                .filter(o -> o.getUserId().equals(user.getId()))
                .orElseThrow(() -> new ErrorException(ErrorCode.ORDER_NOT_FOUND));

        if (!OrderStatus.PENDING.equals(order.getStatus())) {
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Đơn hàng ở trạng thái PENDING mới hủy được");
        }

        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
        return orderMapper.mapperToOrderResponse(order);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        User user = userService.getUserLogin();
        if (!UserRole.ADMIN.equals(user.getRole())) {
            throw new ErrorException(ErrorCode.FORBIDDEN, "Chỉ ADMIN mới có quyền xem tất cả đơn hàng");
        }
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> {
                    return orderMapper.mapperToOrderResponse(order);
                })
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse updateOrderStatus(String orderId, OrderStatus status) {
        User user = userService.getUserLogin();
        if (!UserRole.ADMIN.equals(user.getRole())) {
            throw new ErrorException(ErrorCode.FORBIDDEN, "Chỉ ADMIN có quyền update trạng thái đơn hàng");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ErrorException(ErrorCode.ORDER_NOT_FOUND));


        order.setStatus(status);
        orderRepository.save(order);

        return orderMapper.mapperToOrderResponse(order);
    }
}
