package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String productId;  // FK đến Product
    private String userId;     // FK đến User

    private int rating;        // số sao (1-5)
    private String comment;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}

