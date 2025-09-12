package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.LoginRequest;
import com.dinhvankhanh.seafood.dtos.requests.RegisterRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuthResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;

public interface AuthenticationService {
    UserResponse register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);

}
