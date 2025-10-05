package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.AddCartItemRequest;
import com.dinhvankhanh.seafood.dtos.responses.CartItemResponse;
import com.dinhvankhanh.seafood.dtos.responses.CartResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.models.Cart;
import com.dinhvankhanh.seafood.models.CartItem;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.CartRepository;
import com.dinhvankhanh.seafood.repositories.ProductRepository;
import com.dinhvankhanh.seafood.services.CartService;
import com.dinhvankhanh.seafood.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserService userService;

    @Override
    public CartResponse getCart() {
        User user = userService.getUserLogin();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .userId(user.getId())
                            .createdAt(LocalDateTime.now())
                            .build();
                    return cartRepository.save(newCart);
                });

        List<CartItemResponse> itemResponses = cart.getItems().stream().map(i -> {
            Product p = productRepository.findById(i.getProductId())
                    .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND, null));
            return new CartItemResponse(
                    p.getId(),
                    p.getName(),
                    p.getPrice(),
                    i.getQuantity(),
                    p.getPrice().multiply(BigDecimal.valueOf(i.getQuantity()))
            );
        }).toList();

        BigDecimal totalAmount = itemResponses.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartResponse(cart.getId(), user.getId(), itemResponses, totalAmount);
    }

    @Override
    public void addItem(AddCartItemRequest request) {
        User user = userService.getUserLogin();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().userId(user.getId()).build()));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND, null));

        CartItem existing = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(request.getProductId()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + request.getQuantity());
        } else {
            cart.getItems().add(new CartItem(product.getId(), request.getQuantity()));
        }

        cartRepository.save(cart);
    }

    @Override
    public void updateItem(String productId, int quantity) {
        User user = userService.getUserLogin();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ErrorException(ErrorCode.CART_NOT_FOUND));

        cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        if (quantity > 0) {
            cart.getItems().add(new CartItem(productId, quantity));
        }
        cartRepository.save(cart);
    }

    @Override
    public void removeItem(String productId) {
        User user = userService.getUserLogin();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ErrorException(ErrorCode.CART_NOT_FOUND, null));
        cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        cartRepository.save(cart);
    }

    @Override
    public void clearCart() {
        User user = userService.getUserLogin();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ErrorException(ErrorCode.CART_NOT_FOUND, null));
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
