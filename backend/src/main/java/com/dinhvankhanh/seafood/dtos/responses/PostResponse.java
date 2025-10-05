package com.dinhvankhanh.seafood.dtos.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {
    private String id;

    private String title;

    private String content;

    private String authorId;

    private List<String> tags;

    private String thumbnail;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
