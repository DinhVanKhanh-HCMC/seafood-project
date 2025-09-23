package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.LoginRequest;
import com.dinhvankhanh.seafood.dtos.requests.RegisterRequest;
import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.ResetPassRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuthResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.security.TokenBlacklistService;
import com.dinhvankhanh.seafood.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    private final TokenBlacklistService tokenBlacklistService;

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

    @PostMapping("/logout")
    public ApiResource<Void> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
        }
        return ApiResource.ok(null, "Đăng xuất thành công");
    }

    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");

        if (tokenBlacklistService.isBlacklisted(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is blacklisted");
        }

        return ResponseEntity.ok("Token is valid");
    }

    @PostMapping("/reset-password")
    public ApiResource<Void> resetPassword(@Valid @RequestBody ResetPassRequest resetPassRequest){
        boolean result = authenticationService.resetPassword(resetPassRequest);
        return ApiResource.ok(null, "Lấy lại mật khẩu thành công");
    }



}
