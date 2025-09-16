package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class OtpService {

    private static final Logger logger = Logger.getLogger(OtpService.class.getName());

    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    private RedisService redisService;

    @Autowired
    private EmailService emailService;

    private final UserRepository userRepository;

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public Map<String,String> sendOtp(String email, String mode) {
        Map<String,String> result = new HashMap<>();
        boolean existsByEmail = userRepository.existsByEmail(email);

        if ("reset".equals(mode)) {
            if (!existsByEmail) {
                throw new ErrorException(ErrorCode.NOT_FOUND, "Email không tồn tại trong hệ thống");
            }
        } else if ("register".equals(mode)) {
            if (existsByEmail) {
                throw new ErrorException(ErrorCode.EMAIL_ALREADY_EXISTS, "Email đã tồn tại trong hệ thống");
            }
        }
        try {
            String otp = generateOtp();
            redisService.saveOtp(email, otp);
            emailService.sendOtpEmail(email, otp);
            logger.info("OTP sent successfully to: " + email);
            result.put("message","Gửi OTP thành công");
        } catch (Exception e) {
            logger.severe("Error sending OTP to " + email + ": " + e.getMessage());
            throw new RuntimeException("Gửi email thất bại", e);
        }
        return result;
    }

    public boolean verifyOtp(String email, String otp) {
        String key = "otp:" + email;
        String storedOtp = redisTemplate.opsForValue().get(key);
        if(storedOtp == null){
            throw new ErrorException(ErrorCode.EXPIRED);
        }
        if(!storedOtp.equals(otp)){
            throw new ErrorException(ErrorCode.INVALID);
        }
        redisTemplate.delete(key);
        return true;
    }
}
