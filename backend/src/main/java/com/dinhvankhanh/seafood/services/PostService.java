package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.PostRequest;
import com.dinhvankhanh.seafood.dtos.responses.PostResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    public List<PostResponse> getAllPost();
    public PostResponse getPostById(String id);
    public PostResponse createPost(PostRequest postRequest, MultipartFile image);
    public PostResponse updatePost(String id, PostRequest postRequest, MultipartFile image);
    public void deletePost(String id);

}
