package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.AddReviewRequest;
import com.dinhvankhanh.seafood.dtos.responses.ReviewResponse;

import java.util.List;

public interface ReviewService {
    public ReviewResponse addReview(AddReviewRequest addReviewRequest);

    public List<ReviewResponse> getAllReviewOfProduct(String productId);

    public void deleteReview(String id);
}
