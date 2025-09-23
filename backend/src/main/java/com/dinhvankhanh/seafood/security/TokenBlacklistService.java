package com.dinhvankhanh.seafood.security;

import com.dinhvankhanh.seafood.models.BlacklistedToken;
import com.dinhvankhanh.seafood.repositories.BlacklistedTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TokenBlacklistService {

    @Autowired
    private BlacklistedTokenRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    public void blacklistToken(String token) {
        LocalDateTime expiry = jwtUtil.extractExpiration(token);
        System.out.println("Blacklisting: " + token);// bạn cần hàm này
        BlacklistedToken blacklistedToken = new BlacklistedToken(token, expiry);
        repository.save(blacklistedToken);
    }

    public boolean isBlacklisted(String token) {
        return repository.existsByToken(token);
    }
}
