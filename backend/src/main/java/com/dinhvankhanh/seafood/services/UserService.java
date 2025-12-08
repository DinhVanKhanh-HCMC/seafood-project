package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.ChangePasswordRequest;
import com.dinhvankhanh.seafood.dtos.requests.UserUpdateRequest;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    public UserResponse getCurrentUser(HttpServletRequest request);

    public UserResponse getUserById(String id);

    public UserResponse updateUser(String id, MultipartFile avt, UserUpdateRequest userUpdateRequest);

    public List<UserResponse> getAllUser();

    public void deleteUser(String id);

    public User getUserLogin();

    boolean changePassword(ChangePasswordRequest changePasswordRequest);
}
