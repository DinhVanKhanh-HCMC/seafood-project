package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.ProductResponse;
import com.dinhvankhanh.seafood.models.Category;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.models.Review;
import com.dinhvankhanh.seafood.repositories.CategoryRepository;
import com.dinhvankhanh.seafood.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public ProductResponse mapperToProductResponse(Product product){

        String categoryName = categoryRepository.findById(product.getCategoryId())
                .map(Category::getName)
                .orElse(null);

        int reviewCount = reviewRepository.countByProductId(product.getId());
        double avgRating = reviewRepository.findByProductId(product.getId())
                .stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);


        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .categoryName(categoryName)
                .origin(product.getOrigin())
                .avgRating(avgRating)
                .description(product.getDescription())
                .reviewCount(reviewCount)
                .images(product.getImages())
                .inStock(product.isInStock())
                .build();
    }
}
