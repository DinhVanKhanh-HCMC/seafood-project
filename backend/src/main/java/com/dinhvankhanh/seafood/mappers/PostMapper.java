package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.PostResponse;
import com.dinhvankhanh.seafood.models.Post;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {
    public PostResponse mapperToPostResponse(Post post){
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .authorId(post.getAuthorId())
                .content(post.getContent())
                .tags(post.getTags())
                .createdAt(post.getCreatedAt())
                .thumbnail(post.getThumbnail())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
