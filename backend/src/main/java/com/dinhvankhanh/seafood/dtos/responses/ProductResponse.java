package com.dinhvankhanh.seafood.dtos.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private String id;

    private String name;

    private String description;

    private BigDecimal price;

    private boolean inStock;

    private BigDecimal originalPrice;

    private String origin;

    private String weight;

    private List<String> images;

    private String categoryId;

    private int reviewCount;

    private double avgRating;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
