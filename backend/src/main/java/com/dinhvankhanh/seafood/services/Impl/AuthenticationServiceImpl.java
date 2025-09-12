package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.LoginRequest;
import com.dinhvankhanh.seafood.dtos.requests.RegisterRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuthResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.enums.UserRole;
import com.dinhvankhanh.seafood.mappers.UserMapper;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import com.dinhvankhanh.seafood.security.JwtUtil;
import com.dinhvankhanh.seafood.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;



    @Override
    public UserResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được đăng ký");
        }

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName())
                .role(UserRole.CUSTOMER)
                .phone(registerRequest.getPhone())
                .build();

        userRepository.save(user);

        return userMapper.mapToUserResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User không tồn tại"));

            String token = jwtUtil.generateToken(user.getEmail());

            UserResponse userResponse = userMapper.mapToUserResponse(user);

            return AuthResponse.builder()
                    .token(token)
                    .user(userResponse)
                    .build();
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Tài khoản hoặc mật khẩu không chính xác");
        }
    }
}
