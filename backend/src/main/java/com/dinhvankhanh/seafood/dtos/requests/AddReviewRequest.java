package com.dinhvankhanh.seafood.dtos.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddReviewRequest {
    private String productId;  // FK đến Product


    private int rating;        // số sao (1-5)
    private String comment;
}
