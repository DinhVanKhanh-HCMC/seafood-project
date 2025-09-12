package com.dinhvankhanh.seafood.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {
    private String SECRET_KEY = "vTxLNH9Zl4LjbK25RYJzjEWQpvB2MUzFoYqyy1wLas8=";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

//    public Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        LocalDateTime expiration = extractExpiration(token);
        return expiration.isBefore(LocalDateTime.now());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    public LocalDateTime extractExpiration(String token) {
        Date date = extractAllClaims(token).getExpiration();
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    // Thêm vào cuối class JwtUtil:
    public String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Bỏ "Bearer " ra
        }
        return null;
    }

}

