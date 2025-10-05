package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.ProductResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.models.Category;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.models.Review;
import com.dinhvankhanh.seafood.repositories.CategoryRepository;
import com.dinhvankhanh.seafood.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public ProductResponse mapperToProductResponse(Product product){


        int reviewCount = reviewRepository.countByProductId(product.getId());
        List<Review> reviews = reviewRepository.findByProductId(product.getId())
                .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND));

        double avgRating = reviews.stream()
                .mapToInt(Review::getRating)   // đây mới là method reference đúng
                .average()
                .orElse(0.0);


        avgRating = Math.round(avgRating * 10.0) / 10.0; // làm tròn 1 chữ số



        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .originalPrice(product.getOriginalPrice())
                .price(product.getPrice())
                .weight(product.getWeight())
                .categoryId(product.getCategoryId())
                .origin(product.getOrigin())
                .avgRating(avgRating)
                .description(product.getDescription())
                .reviewCount(reviewCount)
                .images(product.getImages())
                .inStock(product.isInStock())
                .build();
    }
}
