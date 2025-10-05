package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.ReviewResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.models.Review;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    @Autowired
    private UserRepository userRepository;

    public ReviewResponse mapperToReviewResponse(Review review){

        User user = userRepository.findById(review.getUserId())
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

        return ReviewResponse.builder()
                .id(review.getId())
                .productId(review.getProductId())
                .user(user.getFullName())
                .comment(review.getComment())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
