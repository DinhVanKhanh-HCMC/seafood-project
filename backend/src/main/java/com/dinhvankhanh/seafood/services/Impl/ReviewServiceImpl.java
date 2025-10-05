package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.AddReviewRequest;
import com.dinhvankhanh.seafood.dtos.responses.ReviewResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.ReviewMapper;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.models.Review;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.ProductRepository;
import com.dinhvankhanh.seafood.repositories.ReviewRepository;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import com.dinhvankhanh.seafood.services.ReviewService;
import com.dinhvankhanh.seafood.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final ReviewRepository reviewRepository;

    private final ReviewMapper reviewMapper;

    private final UserService userService;



    @Override
    public ReviewResponse addReview(AddReviewRequest addReviewRequest) {
        User user = userService.getUserLogin();

        if(!productRepository.existsById(addReviewRequest.getProductId())){
            throw new ErrorException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        Review review = Review.builder()
                .userId(user.getId())
                .productId(addReviewRequest.getProductId())
                .comment(addReviewRequest.getComment())
                .rating(addReviewRequest.getRating())
                .build();

        reviewRepository.save(review);

        return reviewMapper.mapperToReviewResponse(review);
    }

    @Override
    public List<ReviewResponse> getAllReviewOfProduct(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND));

        // Lấy danh sách review
        List<Review> reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(product.getId());

        return reviews.stream()
                .map(review -> {
                    return reviewMapper.mapperToReviewResponse(review);
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReview(String id) {
        if(!reviewRepository.existsById(id)){
            throw new ErrorException(ErrorCode.REVIEW_NOT_FOUND);
        }
        reviewRepository.deleteById(id);
    }
}
