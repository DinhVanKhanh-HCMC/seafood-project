package com.dinhvankhanh.seafood.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {
    @NotBlank(message = "Tên không được để trống")
    private String name;

    private String description;

    private boolean inAuction;

    private BigDecimal price;

    private String origin;

    private boolean inStock;

    @NotBlank(message = "Danh mục không được để trống")
    private String categoryId;

    private List<String> oldImages;
}
