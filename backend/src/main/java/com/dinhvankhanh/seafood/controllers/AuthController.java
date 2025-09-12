package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.LoginRequest;
import com.dinhvankhanh.seafood.dtos.requests.RegisterRequest;
import com.dinhvankhanh.seafood.dtos.responses.ApiResource;
import com.dinhvankhanh.seafood.dtos.responses.AuthResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApiResource<UserResponse> register(@Valid @RequestBody RegisterRequest registerRequest){
        UserResponse userResponse = authenticationService.register(registerRequest);
        return ApiResource.ok(userResponse, "Đăng ký thành công");
    }

    @PostMapping("/login")
    public ApiResource<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        AuthResponse authResponse = authenticationService.login(loginRequest);
        return ApiResource.ok(authResponse,"Đăng nhập thành công");
    }


}
