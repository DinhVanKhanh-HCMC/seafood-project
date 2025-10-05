package com.dinhvankhanh.seafood.controllers;


import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.PostRequest;
import com.dinhvankhanh.seafood.dtos.responses.PostResponse;
import com.dinhvankhanh.seafood.services.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ApiResource<List<PostResponse>> getAllPost(){
        List<PostResponse> responses = postService.getAllPost();
        return ApiResource.ok(responses,"Lấy danh sách bài viết thành công");
    }

    @GetMapping("/{id}")
    public ApiResource<PostResponse> getPostById(@PathVariable String id){
        PostResponse response = postService.getPostById(id);
        return ApiResource.ok(response,"Lấy bài viết theo id thành công");
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResource<PostResponse> createPost(@Valid @ModelAttribute PostRequest postRequest,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        PostResponse response = postService.createPost(postRequest, image);
        return ApiResource.ok(response, "Thêm bài viết thành công");
    }

    @PostMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResource<PostResponse> createPost(@PathVariable String id,@Valid @ModelAttribute PostRequest postRequest,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        PostResponse response = postService.updatePost(id,postRequest, image);
        return ApiResource.ok(response, "Cập nhật bài viết thành công");
    }

    @PostMapping("/delete/{id}")
    public ApiResource<String> deletePost(@PathVariable String id){
        postService.deletePost(id);
        return ApiResource.ok("Xoá post "+id+" thành công", "SUCCESS");
    }


}
