package com.dinhvankhanh.seafood.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest {
    private String title;

    private String content;

    private String authorId;

    private List<String> tags;
}
