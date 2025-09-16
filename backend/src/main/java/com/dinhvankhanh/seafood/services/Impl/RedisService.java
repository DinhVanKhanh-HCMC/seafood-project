package com.dinhvankhanh.seafood.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

@Service
public class RedisService {

    private static final Logger logger = Logger.getLogger(RedisService.class.getName());

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void saveOtp(String email, String otp) {
        try {
            String key = "otp:" + email;
            redisTemplate.opsForValue().set(key, otp, 5, TimeUnit.MINUTES);
            logger.info("OTP saved successfully for email: " + email);
        } catch (Exception e) {
            logger.severe("Error saving OTP to Redis: " + e.getMessage());
            throw new RuntimeException("Could not save OTP to Redis", e);
        }
    }

    public String getOtp(String email) {
        try {
            String key = "otp:" + email;
            return redisTemplate.opsForValue().get(key);
        } catch (Exception e) {
            logger.severe("Error retrieving OTP from Redis: " + e.getMessage());
            throw new RuntimeException("Could not retrieve OTP from Redis", e);
        }
    }

    public void deleteOtp(String email) {
        try {
            String key = "otp:" + email;
            redisTemplate.delete(key);
            logger.info("OTP deleted successfully for email: " + email);
        } catch (Exception e) {
            logger.severe("Error deleting OTP from Redis: " + e.getMessage());
            throw new RuntimeException("Could not delete OTP from Redis", e);
        }
    }

    public boolean validateOtp(String email, String otp) {
        try {
            String storedOtp = getOtp(email);
            return storedOtp != null && storedOtp.equals(otp);
        } catch (Exception e) {
            logger.severe("Error validating OTP: " + e.getMessage());
            return false;
        }
    }
}
