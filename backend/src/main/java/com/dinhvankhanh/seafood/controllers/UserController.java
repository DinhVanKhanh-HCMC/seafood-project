package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.ChangePasswordRequest;
import com.dinhvankhanh.seafood.dtos.requests.UserUpdateRequest;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ApiResource<List<UserResponse>> getAllUsers() {
        List<UserResponse> response = userService.getAllUser();
        return ApiResource.ok(response,"SUCCESS");
    }

    @GetMapping("/me")
    public ApiResource<UserResponse> getCurrentUser(HttpServletRequest request){
        UserResponse response = userService.getCurrentUser(request);
        return ApiResource.ok(response,"Lấy thông tin user hiện tại thành công");
    }

    @PostMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResource<UserResponse> updateUser(@PathVariable String id,
                                                @Valid @ModelAttribute UserUpdateRequest userUpdateRequest,
                                                @RequestPart(value = "avatar", required = false) MultipartFile avatar){
        UserResponse userResponse = userService.updateUser(id,avatar,userUpdateRequest);
        return ApiResource.ok(userResponse,"Cập nhật thông tin người dùng thành công");
    }

    @PostMapping("/delete/{id}")
    public ApiResource<String> deleteUser(@PathVariable String id){
        userService.deleteUser(id);
        return ApiResource.ok("Xoá user "+id+" thành công", "SUCCESS");
    }

    @PostMapping("/change-password")
    public ApiResource<String> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest){
        userService.changePassword(changePasswordRequest);
        return ApiResource.ok("Thay đổi mật khẩu thành công", "Thay đổi mật khẩu thành công");
    }

}
