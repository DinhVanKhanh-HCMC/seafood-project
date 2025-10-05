package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "posts")
public class Post {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String title;

    private String content; // nội dung dài, lưu dạng String

    private String authorId; // user hoặc admin viết bài

    private List<String> tags;

    private String thumbnail; // ảnh đại diện bài viết

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
