package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "products")
public class Product {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String name;

    private String description;

    private BigDecimal originalPrice;

    private BigDecimal price;

    private String origin;

    private String weight;

    private boolean inStock = true;

    private String categoryId;

    private List<String> images;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}

