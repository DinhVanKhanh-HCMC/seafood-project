package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.ChangePasswordRequest;
import com.dinhvankhanh.seafood.dtos.requests.UserUpdateRequest;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.UserMapper;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import com.dinhvankhanh.seafood.security.JwtUtil;
import com.dinhvankhanh.seafood.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtUtil jwtUtils;

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final S3Service s3Service;

    private final PasswordEncoder passwordEncoder;





    @Override
    public UserResponse getCurrentUser(HttpServletRequest request) {
        String token = jwtUtils.getTokenFromRequest(request); // tự viết hàm lấy token từ header

        String email = jwtUtils.extractUsername(token); // giải mã email từ JWT
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

//        String avatarUrl = (user.getAvatar() != null && !user.getAvatar().isEmpty())
//                ? user.getAvatar()
//                : "/images/default-avt.png";

        UserResponse response = userMapper.mapToUserResponse(user);

        return response;
    }

    @Override
    public UserResponse updateUser(String id, MultipartFile avt, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

        LocalDate dateOfBirth = userUpdateRequest.getDateOfBirth();

        Period age = Period.between(dateOfBirth, LocalDate.now());
        if (age.getYears() < 18) {
            throw new ErrorException(ErrorCode.DATEOFBIRTH_INVALID);
        }

        user.setEmail(userUpdateRequest.getEmail());
        user.setFullName(userUpdateRequest.getFullName());
        user.setPhone(userUpdateRequest.getPhone());
        user.setDateOfBirth(dateOfBirth);
        user.setGender(userUpdateRequest.getGender());

        if(avt != null) {
            String imageUrl = s3Service.saveImageToS3(avt);
            user.setAvatar(imageUrl);
        }

        user.setUpdateAt(LocalDateTime.now());
        userRepository.save(user);

        return userMapper.mapToUserResponse(user);

    }

    @Override
    public List<UserResponse> getAllUser() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(user -> {
                    String avatarUrl = (user.getAvatar() != null && !user.getAvatar().isEmpty())
                            ? user.getAvatar()
                            : "https://seafood-project-1306.s3.ap-southeast-1.amazonaws.com/default-avt.png";
                    return UserResponse.builder()
                            .id(user.getId())
                            .email(user.getEmail())
                            .fullName(user.getFullName())
                            .phone(user.getPhone())
                            .role(user.getRole())
                            .avatar(avatarUrl)
                            .dateOfBirth(user.getDateOfBirth())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        if(!userRepository.existsById(id)){
            throw new ErrorException(ErrorCode.USER_NOT_FOUND,"User không tồn tại: "+id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public User getUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            throw new ErrorException(ErrorCode.UNAUTHORIZED, "Unauthorized: User not logged in");
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND, "User not found"));
    }

    @Override
    public boolean changePassword(ChangePasswordRequest changePasswordRequest) {
        User user = getUserLogin();

        // So sánh mật khẩu cũ
        if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new ErrorException(ErrorCode.INVALID_CREDENTIALS); // Sai mật khẩu cũ
        }

        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new ErrorException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        // Mã hóa mật khẩu mới
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return true;
    }


}
