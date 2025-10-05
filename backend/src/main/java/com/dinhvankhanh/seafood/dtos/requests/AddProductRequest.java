package com.dinhvankhanh.seafood.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddProductRequest {

    @NotBlank(message = "Tên không được để trống")
    private String name;

    private String description;

    private BigDecimal originalPrice;

    private BigDecimal price;

    private String origin;

    private String weight;

    private boolean inStock;

    @NotBlank(message = "Danh mục không được để trống")
    private String categoryId;
}
