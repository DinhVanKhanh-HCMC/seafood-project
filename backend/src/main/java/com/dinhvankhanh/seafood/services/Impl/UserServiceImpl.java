package com.dinhvankhanh.seafood.services.Impl;

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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtUtil jwtUtils;

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final S3Service s3Service;





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

        user.setEmail(userUpdateRequest.getEmail());
        user.setFullName(userUpdateRequest.getFullName());
//        user.setAddress(userUpdateRequest.getAddress());
//        user.setPhone(userUpdateRequest.getPhone());
//        user.setDateOfBirth(userUpdateRequest.getDateOfBirth());

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
                            .address(user.getAddress())
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


}
