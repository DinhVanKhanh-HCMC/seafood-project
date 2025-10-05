package com.dinhvankhanh.seafood.controllers;


import com.dinhvankhanh.seafood.dtos.requests.AddReviewRequest;
import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.responses.ReviewResponse;
import com.dinhvankhanh.seafood.services.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ApiResource<ReviewResponse> createReview(@Valid @RequestBody AddReviewRequest addReviewRequest){
        ReviewResponse response = reviewService.addReview(addReviewRequest);
        return ApiResource.ok(response,"Thêm đánh giá thành công");
    }

    @GetMapping("/product/{id}")
    public ApiResource<List<ReviewResponse>> getAllReviewOfProduct(@PathVariable String id){
        List<ReviewResponse> responses = reviewService.getAllReviewOfProduct(id);
        return ApiResource.ok(responses,"Lấy danh sách đánh giá của sản phẩm thành công");
    }

    @PostMapping("/delete/{id}")
    public ApiResource<String> deleteReview(@PathVariable String id){
        reviewService.deleteReview(id);
        return ApiResource.ok("Xóa đánh giá thành công","SUCCESS");
    }

}
