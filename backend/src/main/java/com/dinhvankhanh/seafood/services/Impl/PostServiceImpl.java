package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.PostRequest;
import com.dinhvankhanh.seafood.dtos.responses.PostResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.PostMapper;
import com.dinhvankhanh.seafood.models.Post;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.PostRepository;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import com.dinhvankhanh.seafood.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    private final S3Service s3Service;

    private final UserRepository userRepository;

    @Override
    public List<PostResponse> getAllPost() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(post -> {
                    return postMapper.mapperToPostResponse(post);
                })
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse getPostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.POST_NOT_FOUND));

        return postMapper.mapperToPostResponse(post);
    }

    @Override
    public PostResponse createPost(PostRequest postRequest, MultipartFile image) {

        if(!userRepository.existsById(postRequest.getAuthorId())){
            throw new ErrorException(ErrorCode.POST_NOT_FOUND);
        }

        Post post = Post.builder()
                .title(postRequest.getTitle())
                .authorId(postRequest.getAuthorId())
                .content(postRequest.getContent())
                .tags(postRequest.getTags())
                .build();

        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Service.saveImageToS3(image);
            post.setThumbnail(imageUrl);
        }



        postRepository.save(post);
        return postMapper.mapperToPostResponse(post);
    }

    @Override
    public PostResponse updatePost(String id, PostRequest postRequest, MultipartFile image) {
          Post post = postRepository.findById(id)
                  .orElseThrow(() -> new ErrorException(ErrorCode.POST_NOT_FOUND));

        if(!userRepository.existsById(postRequest.getAuthorId())){
            throw new ErrorException(ErrorCode.USER_NOT_FOUND);
        }

        post.setTitle(postRequest.getTitle());
        post.setContent(post.getContent());
        post.setAuthorId(post.getAuthorId());
        post.setTags(post.getTags());

        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Service.saveImageToS3(image);
            post.setThumbnail(imageUrl);
        }

        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);

        return postMapper.mapperToPostResponse(post);
    }

    @Override
    public void deletePost(String id) {
        if(!postRepository.existsById(id)){
            throw new ErrorException(ErrorCode.POST_NOT_FOUND);
        }
        postRepository.deleteById(id);

    }
}
