package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.AddCartItemRequest;
import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.responses.CartResponse;
import com.dinhvankhanh.seafood.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ApiResource<CartResponse> getCart(){
        CartResponse response = cartService.getCart();
        return ApiResource.ok(response,"Lấy giỏ hàng thành công");
    }

    @PostMapping("/add")
    public ApiResource<String> addItem(@RequestBody AddCartItemRequest request) {
        cartService.addItem(request);
        return ApiResource.ok("Thêm item vào giỏ thành công","Thêm item vào giỏ thành công");
    }

    @PostMapping("/update/{productId}")
    public ApiResource<String> updateItem(@PathVariable String productId,
                                          @RequestBody Map<String, Integer> body) {
        int quantity = body.get("quantity");
        cartService.updateItem(productId, quantity);
        return ApiResource.ok("Update item thành công","SUCCESS");
    }

    @PostMapping("/delete/{productId}")
    public ApiResource<String> removeItem(@PathVariable String productId) {
        cartService.removeItem(productId);
        return ApiResource.ok("Xóa item thành công","SUCCESS");
    }

    @PostMapping("/clear")
    public ApiResource<String> clearCart() {
        cartService.clearCart();
        return ApiResource.ok("Clear giỏ hàng thành công","SUCCESS");
    }

}
