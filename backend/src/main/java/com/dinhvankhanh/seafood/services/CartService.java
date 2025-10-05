package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.AddCartItemRequest;
import com.dinhvankhanh.seafood.dtos.responses.CartResponse;

public interface CartService {
    public CartResponse getCart();
    public void addItem(AddCartItemRequest request);
    public void updateItem(String productId, int quantity);
    public void removeItem(String productId);
    public void clearCart();
}
